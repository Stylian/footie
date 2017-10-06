package test.java.services;

import java.util.List;

import org.hibernate.Session;
import org.junit.Test;

import main.java.DataAccessObject;
import main.java.HibernateUtils;
import main.java.dtos.Group;
import main.java.dtos.Stats;
import main.java.dtos.Team;
import main.java.services.GroupService;

public class GroupServiceTest {
	
	@Test
	public void testGetTeamsInGroup() {

		Session session = HibernateUtils.getSessionFactory().openSession();
		
		GroupService groupService = new GroupService(session);

		DataAccessObject<Group> groupDao = new DataAccessObject<>(session);
		Group group = (Group) groupDao.getById(1, Group.class); // to fix
		
		List<Team> teams = groupService.getTeams(group);
		
		System.out.println("name           W   D   L   GS   GC");
		for(Team t : teams) {
			Stats stats = groupService.getStatsForTeam(group, t);
			System.out.println(t.getName() + "   " + stats.getWins() + " " + stats.getDraws() + " " + stats.getLosses() 
				+ " " + stats.getGoalsScored()  + " " + stats.getGoalsConceded());
		}
		
		session.close();
		
	}
}
