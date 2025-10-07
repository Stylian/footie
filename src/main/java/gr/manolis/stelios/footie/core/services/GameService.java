package gr.manolis.stelios.footie.core.services;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import gr.manolis.stelios.footie.core.Utils;
import gr.manolis.stelios.footie.core.peristence.dtos.matchups.MatchupTieStrategy;
import gr.manolis.stelios.footie.core.peristence.dtos.rounds.Round;
import org.apache.log4j.Logger;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import gr.manolis.stelios.footie.core.peristence.DataAccessObject;
import gr.manolis.stelios.footie.core.peristence.dtos.Stats;
import gr.manolis.stelios.footie.core.peristence.dtos.Team;
import gr.manolis.stelios.footie.core.peristence.dtos.games.Game;
import gr.manolis.stelios.footie.core.peristence.dtos.games.GroupGame;
import gr.manolis.stelios.footie.core.peristence.dtos.games.MatchupGame;
import gr.manolis.stelios.footie.core.peristence.dtos.games.Result;
import gr.manolis.stelios.footie.core.peristence.dtos.groups.Season;
import gr.manolis.stelios.footie.core.peristence.dtos.matchups.Matchup;

/**
 * manages adding game results
 *
 * @author stylian
 */
@Service
@Transactional
public class GameService {

    final static Logger logger = Logger.getLogger(GameService.class);

    @Autowired
    private SessionFactory sessionFactory;

    @Autowired
    private ServiceUtils serviceUtils;

    public Game getNextGame() {
        logger.info("retrieving next game...");

        List results = sessionFactory.getCurrentSession().createQuery("from GAMES").list();

        List<Game> gamesRemaining = new ArrayList<>();

        for (Iterator iterator = results.iterator(); iterator.hasNext(); ) {

            Game game0 = (Game) iterator.next();
            if (game0.getResult() == null) {
                gamesRemaining.add(game0);
            }

        }

        if (gamesRemaining.size() == 0) {
            return null;
        } else {
            List<Game> games1 = gamesRemaining.stream().filter(g -> g.getDay() == 1).collect(Collectors.toList());
            List<Game> games2 = gamesRemaining.stream().filter(g -> g.getDay() == 2).collect(Collectors.toList());
            List<Game> games3 = gamesRemaining.stream().filter(g -> g.getDay() == 3).collect(Collectors.toList());
            List<Game> games4 = gamesRemaining.stream().filter(g -> g.getDay() == 4).collect(Collectors.toList());
            List<Game> games5 = gamesRemaining.stream().filter(g -> g.getDay() == -1).collect(Collectors.toList());

            List<Game> gamesRemaining2 = new ArrayList<>();
            gamesRemaining2.addAll(games1);
            gamesRemaining2.addAll(games2);
            gamesRemaining2.addAll(games3);
            gamesRemaining2.addAll(games4);
            gamesRemaining2.addAll(games5);

            return gamesRemaining2.get(0);
        }

    }

    public void addResult(Game game, Result result) {
        logger.info("adding game result to game " + game.getHomeTeam() + " - " + game.getAwayTeam() + "  "
                + result.getGoalsMadeByHomeTeam() + " - " + result.getGoalsMadeByAwayTeam());

        Season season = serviceUtils.loadCurrentSeason();

        if (game.getResult() != null) {
            return;
        }

        // add stats to teams
        Team team = game.getHomeTeam();

        Stats thisGameStats = new Stats();
        thisGameStats.addGoalsScored(result.getGoalsMadeByHomeTeam());
        thisGameStats.addGoalsConceded(result.getGoalsMadeByAwayTeam());

        if (result.homeTeamWon()) {
            thisGameStats.addWins(1);
        } else if (result.awayTeamWon()) {
            thisGameStats.addLosses(1);
        } else if (result.tie()) {
            thisGameStats.addDraws(1);
        }

        Stats toAddToSeasonStats = new Stats(thisGameStats);

        game.setResult(result);

        if (game instanceof MatchupGame) {
            MatchupGame matchupGame = (MatchupGame) game;
            ifMatchupIsFinishedDecideTheWinner(matchupGame.getMatchup());

            // elo calculation
            Utils.getEloForMatchup(season, matchupGame.getMatchup());

        } else if (game instanceof GroupGame) {
            if (result.homeTeamWon()) {
                thisGameStats.addPoints(3);
            } else if (result.tie()) {
                thisGameStats.addPoints(1);
            }
            GroupGame groupGame = (GroupGame) game;
            team.getStatsForGroup(groupGame.getRobinGroup()).addStats(thisGameStats);
        }

        Stats seasonStats = team.getStatsForGroup(season);
        seasonStats.addStats(toAddToSeasonStats);

        DataAccessObject<Game> gameDao = new DataAccessObject<>(sessionFactory.getCurrentSession());
        gameDao.save(game);

    }

    public void ifMatchupIsFinishedDecideTheWinner(Matchup matchup) {

        // if it is the last game of the matchup mark the matchup with the winner
        for (Game game : matchup.getGames()) {
            if (game.getResult() == null) {
                return; // unfinished matchup
            }
        }

        // finished matchup , so set up winner
        setUpWinner(matchup);
    }

    private void setUpWinner(Matchup matchup) {

        List<Game> games = matchup.getGames();
        Team teamHome = matchup.getTeamHome();
        Team teamAway = matchup.getTeamAway();

        int homeGoals = 0;
        int awayGoals = 0;

        for (Game game : games) {

            if (game.getHomeTeam().equals(teamHome)) {

                homeGoals += game.getResult().getGoalsMadeByHomeTeam();
                awayGoals += game.getResult().getGoalsMadeByAwayTeam();

            } else if (game.getHomeTeam().equals(teamAway)) {

                homeGoals += game.getResult().getGoalsMadeByAwayTeam();
                awayGoals += game.getResult().getGoalsMadeByHomeTeam();

            }

        }

        logger.info("determining matchup winner with aggregate score " + homeGoals + " - " + awayGoals);
        boolean matchupFinished = false;

        if (homeGoals > awayGoals) {
            matchup.setWinner(teamHome);
            matchupFinished = true;

        } else if (homeGoals < awayGoals) {
            matchup.setWinner(teamAway);
            matchupFinished = true;

        } else { // Teams tied

            switch (matchup.getTieStrategy()) {
                case REPLAY_GAMES_ONCE:
                    if (matchup.getGames().size() < 3) {
                        createReplayMatches(matchup, games, teamHome, teamAway);
                        break;
                    } else {
                        // fall through if coeffs are tied
                    }
                case HIGHEST_COEFFICIENT_WINS_THEN_RANDOM:
                    if (!highestCoeffWinsReturnFalseIfEqual(matchup, teamHome, teamAway)) {
                        // pick winner at random
                        matchup.setWinner(Math.random() > 0.5 ? teamHome : teamAway);
                    }
                    matchupFinished = true;
                    break;
                case HIGHEST_COEFFICIENT_WINS:
                    if (highestCoeffWinsReturnFalseIfEqual(matchup, teamHome, teamAway)) {
                        matchupFinished = true;
                        break;
                    }
                    // fall through if coeffs are tied
                case REPLAY_GAMES:
                    createReplayMatches(matchup, games, teamHome, teamAway);
                    break;
                case BEST_POSITION_IN_KNOCKOUTS_TREE:
                    matchup.setWinner(teamHome);
                    matchupFinished = true;
                    break;
            }

        }

        if(matchupFinished) {
            Round nextRound = matchup.getRound().getNextRound();
            if(nextRound != null) {
                nextRound.addTeam(matchup.getWinner());
            }
        }

    }

    private void createReplayMatches(Matchup matchup, List<Game> games, Team teamHome, Team teamAway) {
        Team lastHome = games.get(games.size()-1).getHomeTeam();
        if(teamHome.equals(lastHome)) {
            games.add(new MatchupGame(teamHome, teamAway, Game.EXTRA_GAME, matchup));
            games.add(new MatchupGame(teamAway, teamHome, Game.EXTRA_GAME, matchup));
        }else {
            games.add(new MatchupGame(teamAway, teamHome, Game.EXTRA_GAME, matchup));
            games.add(new MatchupGame(teamHome, teamAway, Game.EXTRA_GAME, matchup));
        }
    }

    private boolean highestCoeffWinsReturnFalseIfEqual(Matchup matchup, Team teamHome, Team teamAway) {
        Stats teamHomeStats = new Stats();
        serviceUtils.loadAllSeasons().forEach((s) -> teamHomeStats.addStats(teamHome.getStatsForGroup(s)));
        Stats teamAwayStats = new Stats();
        serviceUtils.loadAllSeasons().forEach((s) -> teamAwayStats.addStats(teamAway.getStatsForGroup(s)));

        if (teamHomeStats.getPoints() > teamAwayStats.getPoints()) {
            matchup.setWinner(teamHome);
            return true;
        } else if (teamHomeStats.getPoints() < teamAwayStats.getPoints()) {
            matchup.setWinner(teamAway);
            return true;
        }

        if (teamHomeStats.getElo() > teamAwayStats.getElo()) {
            matchup.setWinner(teamHome);
            return true;
        } else if (teamHomeStats.getElo() < teamAwayStats.getElo()) {
            matchup.setWinner(teamAway);
            return true;
        }

        return false;
    }

}
