package main.java.services;

import org.hibernate.Session;

import main.java.DataAccessObject;
import main.java.dtos.Game;
import main.java.dtos.Result;

/**
 * manages adding game results
 * @author stylian
 *
 */
public class GameService {

	private Session session;
	
	public GameService(Session session) {
		this.session = session;
	}
	
	public void addResult(Game game, Result result) {
		
		addScoreToGame(game, result);
		
		//TODO add stats to teams
		
	}

	private void addScoreToGame(Game game, Result result) {
		DataAccessObject<Game> gameDao = new DataAccessObject<>(session);
		game.setResult(result);
		gameDao.save(game);
	}
	
}
