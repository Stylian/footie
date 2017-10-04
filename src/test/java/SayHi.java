package test.java;

import java.util.Iterator;
import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.junit.Test;

import main.java.DataAccessObject;
import main.java.HibernateUtils;
import main.java.dtos.Game;
import main.java.dtos.Result;
import main.java.dtos.Stats;
import main.java.dtos.Team;

public class SayHi {

	@Test
	public void addGame() throws Exception {

		Session session = HibernateUtils.getSessionFactory().openSession();

		DataAccessObject<Team> teamDAO = new DataAccessObject<>(session);
		Team team1 = (Team) teamDAO.getById(1, Team.class);
		Team team2 = (Team) teamDAO.getById(101, Team.class);
		
		Result result = new Result();
		result.setGoalsMadeByAwayTeam(1);
		result.setGoalsMadeByHomeTeam(2);
		
		Game game = new Game();
		game.setAwayTeam(team2);
		game.setHomeTeam(team1);
		game.setResult(result);
		
		DataAccessObject<Game> gameDAO = new DataAccessObject<>(session);
		long id = gameDAO.save(game);

		System.out.println(id);

		session.close();

	}
	
	@Test
	public void testDaoCreate() throws Exception {
		
		Session session = HibernateUtils.getSessionFactory().openSession();
		
		DataAccessObject<Team> dao = new DataAccessObject<>(session);
		
		Team team = new Team();
		team.setName("test team 1");
		
		long id = dao.save(team);
		
		System.out.println(id);
		
		session.close();
		
	}

	@Test
	public void testStatsManyToOne() throws Exception {

		Session session = HibernateUtils.getSessionFactory().openSession();

		DataAccessObject<Team> dao = new DataAccessObject<>(session);

		Team team = new Team();
		team.setName("test team 2");

		long id = dao.save(team);

		System.out.println(id);

		DataAccessObject<Stats> dao2 = new DataAccessObject<>(session);

		Stats stats = new Stats();
		stats.setDraws(4);
		stats.setGoalsScored(2);

		stats.setTeam(team);

		long id2 = dao2.save(stats);

		System.out.println(id2);

		session.close();
	}

	@Test
	public void testDaoGetById() {

		Session session = HibernateUtils.getSessionFactory().openSession();

		DataAccessObject<Team> dao = new DataAccessObject<>(session);
		Team team = (Team) dao.getById(1, Team.class);
		
		System.out.println(team.getName() + "  " + team.getId());

		session.close();

	}
	
	@Test
	public void testDaoUpdate() {
		
		Session session = HibernateUtils.getSessionFactory().openSession();
		
		DataAccessObject<Team> dao = new DataAccessObject<>(session);
		Team team = (Team) dao.getById(1, Team.class);
		
		team.setName("team 3 actually");
		
		long id = dao.save(team);

		System.out.println(id);
		
		
		session.close();
		
	}
	
	@Test
	public void testDaoDelete() {
		
		Session session = HibernateUtils.getSessionFactory().openSession();
		
		DataAccessObject<Stats> dao = new DataAccessObject<>(session);
		Stats stats = (Stats) dao.getById(202, Stats.class);
		
		dao.delete(stats);
		
		session.close();
		
	}

	@Test
	public void test2() {

		Session session = HibernateUtils.getSessionFactory().openSession();

		Transaction tx = null;
		try {
			tx = session.beginTransaction();
			List teams = session.createQuery("FROM TEAMS").list();

			for (Iterator iterator = teams.iterator(); iterator.hasNext();) {
				Team team = (Team) iterator.next();
				System.out.println(team.getName() + "  " + team.getId());
			}

			tx.commit();

		} catch (HibernateException e) {
			if (tx != null)
				tx.rollback();
			e.printStackTrace();
		}

		session.close();

	}
	
	@Test
	public void test3() {
		
		Session session = HibernateUtils.getSessionFactory().openSession();
		
		Transaction tx = null;
		try {
			tx = session.beginTransaction();
			List stats = session.createQuery("FROM STATS").list();
			
			for (Iterator iterator = stats.iterator(); iterator.hasNext();) {
				Stats stat = (Stats) iterator.next();
				System.out.println(stat);
			}
			
			tx.commit();
			
		} catch (HibernateException e) {
			if (tx != null)
				tx.rollback();
			e.printStackTrace();
		}
		
		session.close();
		
	}

	@Test
	public void test4() {
		
		Session session = HibernateUtils.getSessionFactory().openSession();
		
		Transaction tx = null;
		try {
			tx = session.beginTransaction();
			List games = session.createQuery("FROM GAME").list();
			
			for (Iterator iterator = games.iterator(); iterator.hasNext();) {
				Game game = (Game) iterator.next();
				System.out.println(game);
			}
			
			tx.commit();
			
		} catch (HibernateException e) {
			if (tx != null)
				tx.rollback();
			e.printStackTrace();
		}
		
		session.close();
		
	}

}
