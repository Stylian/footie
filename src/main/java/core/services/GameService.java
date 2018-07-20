package core.services;

import java.util.Iterator;
import java.util.List;

import javax.transaction.Transactional;

import org.apache.log4j.Logger;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import core.peristence.DataAccessObject;
import core.peristence.dtos.Stats;
import core.peristence.dtos.Team;
import core.peristence.dtos.games.Game;
import core.peristence.dtos.games.GroupGame;
import core.peristence.dtos.games.MatchupGame;
import core.peristence.dtos.games.Result;
import core.peristence.dtos.groups.Season;
import core.peristence.dtos.matchups.Matchup;

/**
 * manages adding game results
 * 
 * @author stylian
 *
 */
@Service
@Transactional
public class GameService {

	final static Logger logger = Logger.getLogger(GameService.class);

	@Autowired
	private SessionFactory sessionFactory;

	@Autowired
	private ServiceUtils ServiceUtils;
	
	public Game getNextGame() {
		logger.info("retrieving next game...");

		List results = sessionFactory.getCurrentSession().createQuery("from GAMES").list();

		for (Iterator iterator = results.iterator(); iterator.hasNext();) {

			Game game0 = (Game) iterator.next();
			if (game0.getResult() == null) {
				return game0;
			}

		}

		return null;

	}

	public void addResult(Game game, Result result) {
		logger.info("adding game result to game " + game.getHomeTeam() + " - " + game.getAwayTeam() + "  "
				+ result.getGoalsMadeByHomeTeam() + " - " + result.getGoalsMadeByAwayTeam());

		Season season = ServiceUtils.loadCurrentSeason();
		
		// add stats to teams
		Team team = game.getHomeTeam();
		
		Stats thisGameStats = new Stats();
		thisGameStats.addGoalsScored(result.getGoalsMadeByHomeTeam());
		thisGameStats.addGoalsConceded(result.getGoalsMadeByAwayTeam());
		
		if(result.homeTeamWon()) {
		
			thisGameStats.addWins(1);
		
		}else if(result.awayTeamWon()) {
			
			thisGameStats.addLosses(1);
			
		}else if(result.tie()) {
			
			thisGameStats.addDraws(1);
			
		}
		
		Stats toAddToSeasonStats = new Stats(thisGameStats);
		
		game.setResult(result);
		
		if(game instanceof MatchupGame){
			MatchupGame matchupGame = (MatchupGame) game;
			ifMatchupIsFinishedDecideTheWinner(matchupGame.getMatchup());
		}else if(game instanceof GroupGame) {
			
			if(result.homeTeamWon()) {
				
				thisGameStats.addPoints(3);
				
			}else if(result.tie()) {
				
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

		for(Game game : games) {
			
			if(game.getHomeTeam().equals(teamHome)) {
				
				homeGoals += game.getResult().getGoalsMadeByHomeTeam();
				awayGoals += game.getResult().getGoalsMadeByAwayTeam();
				
			}else if(game.getHomeTeam().equals(teamAway)) {
				
				homeGoals += game.getResult().getGoalsMadeByAwayTeam();
				awayGoals += game.getResult().getGoalsMadeByHomeTeam();
				
			}
			
		}
		
		logger.info("determining matchup winner with aggregate score " + homeGoals + " - " + awayGoals);
		
		if(homeGoals > awayGoals) {
			matchup.setWinner(teamHome);
			
		}else if( homeGoals < awayGoals) {
			matchup.setWinner(teamAway);

		}else {
			
			games.add(new MatchupGame(teamAway, teamHome, matchup));
			games.add(new MatchupGame(teamHome, teamAway, matchup));
			
		}
			
	}
	
}
