package test.java;

import org.hibernate.Session;
import org.junit.Test;

import main.java.HibernateUtils;
import main.java.dtos.Season;
import main.java.services.BootService;
import main.java.services.SeasonService;

public class ActionsTesting {
	
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
	public void testCreateQuals() throws Exception {
		
		Session session = HibernateUtils.getSessionFactory().openSession();
		
		SeasonService service = new SeasonService(session);
		service.createQualsRound();
		
		session.close();
	}
	
}
