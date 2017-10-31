package main.java.services;

import java.util.Iterator;
import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.Session;

import main.java.DataAccessObject;
import main.java.dtos.Game;
import main.java.dtos.Result;
import main.java.dtos.Stats;
import main.java.dtos.Team;
import main.java.dtos.groups.Group;
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

		DataAccessObject<Group> groupDao = new DataAccessObject<>(session);
		Group master = groupDao.listByField("GROUPS", "NAME", "master").get(0);

		SeasonService seasonService = new SeasonService(session);
		Season season = seasonService.loadCurrentSeason();
		
		// add stats to teams
		Team team = game.getHomeTeam();
		
		Stats masterStats = team.getStatsForGroup(master);
		masterStats.addGoalsScored(result.getGoalsMadeByHomeTeam());
		masterStats.addGoalsConceded(result.getGoalsMadeByAwayTeam());
		masterStats.addPoints(result.getGoalsMadeByHomeTeam() * 100);
		
		Stats seasonStats = team.getStatsForGroup(season);
		seasonStats.addGoalsScored(result.getGoalsMadeByHomeTeam());
		seasonStats.addGoalsConceded(result.getGoalsMadeByAwayTeam());
		seasonStats.addPoints(result.getGoalsMadeByHomeTeam() * 100);
		
		
		if(result.homeTeamWon()) {
		
			masterStats.addWins(1);
			masterStats.addPoints(1000);
			
			seasonStats.addWins(1);
			seasonStats.addPoints(1000);
		
		}else if(result.awayTeamWon()) {
			
			masterStats.addLosses(1);

			seasonStats.addLosses(1);
			
		}else if(result.tie()) {
			
			masterStats.addDraws(1);
			masterStats.addPoints(500);
			
			seasonStats.addDraws(1);
			seasonStats.addPoints(500);
			
		}
		
		
		
		DataAccessObject<Game> gameDao = new DataAccessObject<>(session);
		game.setResult(result);
		
		// promotion points
		if(game.getMatchup().getWinner() != null) {
			
			Team teamW = game.getMatchup().getWinner();
			Stats masterStatsW = teamW.getStatsForGroup(master);
			Stats seasonStatsW = teamW.getStatsForGroup(season);
			
			masterStatsW.addPoints(1000);
			seasonStatsW.addPoints(1000);
			
		}
		
		gameDao.save(game);
		
	}

}
