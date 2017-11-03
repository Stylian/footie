package test.java;

import java.util.Properties;

import org.apache.commons.lang3.RandomUtils;
import org.hibernate.Session;
import org.junit.Test;

import main.java.HibernateUtils;
import main.java.PropertyUtils;
import main.java.dtos.Result;
import main.java.dtos.games.Game;
import main.java.services.BootService;
import main.java.services.GameService;
import main.java.services.GroupsRoundService;
import main.java.services.QualsService;
import main.java.services.SeasonService;

public class ActionsTesting {

	@Test
	public void simulateSeason() throws Exception {

		Properties properties = PropertyUtils.load();
		properties.setProperty("first_boot", "0");
		properties.setProperty("season", "0");
		properties.setProperty("round_quals_1", "0");
		properties.setProperty("round_quals_2", "0");
		properties.setProperty("groups_round_12", "0");
		properties.setProperty("groups_round_8", "0");
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
		fillUpRemainingGames();
		
//		testSeedAndSetGroupsRound8();
//		fillUpRemainingGames();
		
		testEndCurrentSeason();
		
		HibernateUtils.closeSession();
		
	}

	@Test
	public void testBoot() throws Exception {

		Session session = HibernateUtils.getSession();

		BootService service = new BootService(session);
		service.start();

	}

	@Test
	public void testCreateSeason() throws Exception {

		Session session = HibernateUtils.getSession();

		SeasonService service = new SeasonService(session);
		service.createSeason();

	}

	@Test
	public void testSetUpSeason() throws Exception {

		Session session = HibernateUtils.getSession();

		SeasonService service = new SeasonService(session);
		service.setUpSeason();

	}

	@Test
	public void testSeedQualsRound1() throws Exception {

		Session session = HibernateUtils.getSession();

		QualsService service = new QualsService(session);
		service.seedUpQualsRound1();

	}

	@Test
	public void testSetQualsRound1() throws Exception {

		Session session = HibernateUtils.getSession();

		QualsService service = new QualsService(session);
		service.setUpQualsRound1();

	}

	@Test
	public void fillUpRemainingGames() throws Exception {

		Session session = HibernateUtils.getSession();

		GameService service = new GameService(session);

		while (true) {

			Game next = service.getNextGame();

			if (next == null) {
				break;
			}

			service.addResult(next, new Result(RandomUtils.nextInt(0, 5), RandomUtils.nextInt(0, 5)));

			System.out.println(next);

		}

	}

	@Test
	public void testSeedQualsRound2() throws Exception {

		Session session = HibernateUtils.getSession();

		QualsService service = new QualsService(session);
		service.seedUpQualsRound2();

	}

	@Test
	public void testSetUpQualsRound2() throws Exception {

		Session session = HibernateUtils.getSession();

		QualsService service = new QualsService(session);
		service.setUpQualsRound2();

		session.close();
	}

	@Test
	public void testSeedGroupsRound12() throws Exception {

		Session session = HibernateUtils.getSession();

		GroupsRoundService service = new GroupsRoundService(session);
		service.seedGroupsRoundOf12();

	}

	@Test
	public void testSetUpGroupsRound12() throws Exception {

		Session session = HibernateUtils.getSession();

		GroupsRoundService service = new GroupsRoundService(session);
		service.setUpGroupsRoundOf12();

	}

	@Test
	public void testSeedAndSetGroupsRound8() throws Exception {

		Session session = HibernateUtils.getSession();

		GroupsRoundService service = new GroupsRoundService(session);
		service.seedAndSetGroupsRoundOf8();

	}

	@Test
	public void testEndCurrentSeason() throws Exception {

		Session session = HibernateUtils.getSession();

		SeasonService service = new SeasonService(session);
		service.endCurrentSeason();

	}
	
}
