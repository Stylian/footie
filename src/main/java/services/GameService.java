package main.java.services;

import java.util.Iterator;
import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.Session;

import main.java.DataAccessObject;
import main.java.dtos.Game;
import main.java.dtos.Result;

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
			if(game0.getResult() == null) {
				return game0;
			}

		}
		
		return null;
		
	}
	
	public void addResult(Game game, Result result) {

		addScoreToGame(game, result);

		// TODO add stats to teams

	}

	private void addScoreToGame(Game game, Result result) {
		logger.info("adding game result to game " + game.getHomeTeam() + " - " + game.getAwayTeam() + "  "
				+ result.getGoalsMadeByHomeTeam() + " - " + result.getGoalsMadeByAwayTeam());

		DataAccessObject<Game> gameDao = new DataAccessObject<>(session);
		game.setResult(result);
		gameDao.save(game);
	}

}
