package test.java.services;

import org.hibernate.Session;
import org.junit.Test;

import main.java.HibernateUtils;
import main.java.services.TeamsLoaderService;

public class TeamsLoaderServiceTest {

	@Test
	public void testLoadTeams() {

		Session session = HibernateUtils.getSessionFactory().openSession();
		
		TeamsLoaderService teamsLoaderService = new TeamsLoaderService(session);
		teamsLoaderService.loadTeams();
		
		session.close();
		
	}
	
}
