package main.java.services;

import java.util.Iterator;
import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.Session;

import main.java.DataAccessObject;
import main.java.dtos.Matchup;
import main.java.dtos.Result;
import main.java.dtos.Stats;
import main.java.dtos.Team;
import main.java.dtos.games.Game;
import main.java.dtos.games.GroupGame;
import main.java.dtos.games.MatchupGame;
import main.java.dtos.groups.Season;

/**
 * manages adding game results
 * 
 * @author stylian
 *
 */
public class GameService {

	final static Logger logger = Logger.getLogger(GameService.class);

	private Session session;

	public GameService(Session session) {
		this.session = session;
	}

	public Game getNextGame() {
		logger.info("retrieving next game...");

		List results = session.createQuery("from GAMES").list();

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

		Season season = ServiceUtils.loadCurrentSeason(session);
		
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
		
		DataAccessObject<Game> gameDao = new DataAccessObject<>(session);
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
