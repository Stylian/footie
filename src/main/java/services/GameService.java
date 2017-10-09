package main.java.services;

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
