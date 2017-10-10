package test.java.services;

import org.hibernate.Session;
import org.junit.Test;

import main.java.HibernateUtils;
import main.java.services.TeamsService;

public class TeamsLoaderServiceTest {

	@Test
	public void testLoadTeams() {

		Session session = HibernateUtils.getSessionFactory().openSession();
		
		TeamsService teamsLoaderService = new TeamsService(session);
		teamsLoaderService.loadTeams();
		
		session.close();
		
	}
	
}
