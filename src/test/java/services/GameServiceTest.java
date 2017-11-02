package test.java.services;

import org.hibernate.Session;
import org.junit.Test;

import main.java.DataAccessObject;
import main.java.HibernateUtils;
import main.java.dtos.Result;
import main.java.dtos.games.Game;
import main.java.services.GameService;

// to remove
public class GameServiceTest {

	@Test
	public void testAddResult() throws Exception {

		Session session = HibernateUtils.getSessionFactory().openSession();
		
		GameService gameService = new GameService(session);

		DataAccessObject<Game> gameDao = new DataAccessObject<>(session);
		Game game = (Game) gameDao.getById(2, Game.class); // to fix
		
		gameService.addResult(game, new Result(5, 1));
		
		session.close();
		
	}
	
}
