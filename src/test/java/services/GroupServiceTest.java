package test.java.services;

import java.util.List;

import org.hibernate.Session;
import org.junit.Test;

import main.java.DataAccessObject;
import main.java.HibernateUtils;
import main.java.dtos.Group;
import main.java.dtos.Team;
import main.java.services.GroupService;

public class GroupServiceTest {
	
	@Test
	public void testGetTeams() {

		Session session = HibernateUtils.getSessionFactory().openSession();
		
		GroupService groupService = new GroupService(session);

		DataAccessObject<Group> groupDao = new DataAccessObject<>(session);
		Group group = (Group) groupDao.getById(1, Group.class);
		
		List<Team> teams = groupService.getTeams(group);
		
		
		for(Team t : teams) {
			System.out.println(t.getName() + "   ");
		}
		
		session.close();
		
	}
}
