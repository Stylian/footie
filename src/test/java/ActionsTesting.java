package test.java;

import java.util.Properties;

import org.hibernate.Session;
import org.junit.Test;

import main.java.HibernateUtils;
import main.java.PropertyUtils;
import main.java.dtos.Game;
import main.java.services.BootService;
import main.java.services.GameService;
import main.java.services.QualsService;
import main.java.services.SeasonService;

public class ActionsTesting {

	@Test
	public void settest() throws Exception {

		Properties properties = PropertyUtils.load();
		properties.setProperty("first_boot", "0");
		properties.setProperty("season", "0");
		properties.setProperty("round", "0");
		PropertyUtils.save(properties);

		testBoot();
		testCreateSeason();
		testCreateQualRounds();
		testSetQualsRound1();
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
	public void testCreateQualRounds() throws Exception {

		Session session = HibernateUtils.getSessionFactory().openSession();

		SeasonService service = new SeasonService(session);
		service.setUpQualsRounds();

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
	public void testS() throws Exception {
		
		Session session = HibernateUtils.getSessionFactory().openSession();
		
		GameService service = new GameService(session);
		Game next  = service.getNextGame();
		
		System.out.println(next);
		
		session.close();
	}

}
