package test.java.services;

import org.hibernate.Session;
import org.junit.Test;

import main.java.HibernateUtils;
import main.java.services.BootService;

public class BootServiceTest {
	
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
	
}
