package test.java;

import java.util.Properties;

import org.apache.commons.lang3.RandomUtils;
import org.hibernate.Session;
import org.junit.Test;

import main.java.HibernateUtils;
import main.java.PropertyUtils;
import main.java.dtos.Game;
import main.java.dtos.Result;
import main.java.services.BootService;
import main.java.services.GameService;
import main.java.services.GroupsRoundService;
import main.java.services.QualsService;
import main.java.services.SeasonService;

public class ActionsTesting {

	@Test
	public void settest() throws Exception {

		Properties properties = PropertyUtils.load();
		properties.setProperty("first_boot", "0");
		properties.setProperty("season", "0");
		properties.setProperty("round_quals_1", "0");
		properties.setProperty("round_quals_2", "0");
		properties.setProperty("groups_round_12", "0");
		PropertyUtils.save(properties);

		testBoot();
		testCreateSeason();
		testSetUpSeason();
		testSeedQualsRound1();
		testSetQualsRound1();
		fillUpRemainingGames();
		testSeedQualsRound2();
		testSetUpQualsRound2();
		fillUpRemainingGames();
		testSeedGroupsRound12();
		testSetUpGroupsRound12();
		
		
		testEndCurrentSeason();
	}

	@Test
	public void testBoot() throws Exception {

		Session session = HibernateUtils.getSessionFactory().openSession();

		BootService service = new BootService(session);
		service.start();

		session.close();

	}

	@Test
	public void testCreateSeason() throws Exception {

		Session session = HibernateUtils.getSessionFactory().openSession();

		SeasonService service = new SeasonService(session);
		service.createSeason();

		session.close();

	}

	@Test
	public void testSetUpSeason() throws Exception {

		Session session = HibernateUtils.getSessionFactory().openSession();

		SeasonService service = new SeasonService(session);
		service.setUpSeason();

		session.close();
	}

	@Test
	public void testSeedQualsRound1() throws Exception {

		Session session = HibernateUtils.getSessionFactory().openSession();

		QualsService service = new QualsService(session);
		service.seedUpQualsRound1();

		session.close();
	}

	@Test
	public void testSetQualsRound1() throws Exception {

		Session session = HibernateUtils.getSessionFactory().openSession();

		QualsService service = new QualsService(session);
		service.setUpQualsRound1();

		session.close();
	}

	@Test
	public void fillUpRemainingGames() throws Exception {

		Session session = HibernateUtils.getSessionFactory().openSession();

		GameService service = new GameService(session);

		while (true) {

			Game next = service.getNextGame();

			if (next == null) {
				break;
			}

			service.addResult(next, new Result(RandomUtils.nextInt(0, 5), RandomUtils.nextInt(0, 5)));

			System.out.println(next);

		}

		session.close();
	}

	@Test
	public void testSeedQualsRound2() throws Exception {

		Session session = HibernateUtils.getSessionFactory().openSession();

		QualsService service = new QualsService(session);
		service.seedUpQualsRound2();

		session.close();
	}

	@Test
	public void testSetUpQualsRound2() throws Exception {

		Session session = HibernateUtils.getSessionFactory().openSession();

		QualsService service = new QualsService(session);
		service.setUpQualsRound2();

		session.close();
	}

	@Test
	public void testSeedGroupsRound12() throws Exception {

		Session session = HibernateUtils.getSessionFactory().openSession();

		GroupsRoundService service = new GroupsRoundService(session);
		service.seedGroupsRoundOf12();

		session.close();
	}

	@Test
	public void testSetUpGroupsRound12() throws Exception {

		Session session = HibernateUtils.getSessionFactory().openSession();

		GroupsRoundService service = new GroupsRoundService(session);
		service.setUpGroupsRoundOf12();

		session.close();
	}

	@Test
	public void testEndCurrentSeason() throws Exception {

		Session session = HibernateUtils.getSessionFactory().openSession();

		SeasonService service = new SeasonService(session);
		service.endCurrentSeason();

		session.close();

	}
	
}
