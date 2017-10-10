package test.java;

import org.hibernate.Session;
import org.junit.Test;

import main.java.HibernateUtils;
import main.java.services.BootService;
import main.java.services.SeasonService;

public class ActionsTesting {
	
	@Test
	public void testCreateMasterGroup() throws Exception {

		Session session = HibernateUtils.getSessionFactory().openSession();
		
		BootService service = new BootService(session);
		service.createMasterGroup();
		
		session.close();
		
	}
	
	@Test
	public void testRegisterTeams() throws Exception {
		
		Session session = HibernateUtils.getSessionFactory().openSession();
		
		BootService service = new BootService(session);
		service.registerTeams();
		
		session.close();
		
	}
	
	@Test
	public void testCreateSeason() throws Exception {
		
		Session session = HibernateUtils.getSessionFactory().openSession();
		
		SeasonService service = new SeasonService(session);
		service.createSeason();
		
		session.close();
		
	}
	
}
