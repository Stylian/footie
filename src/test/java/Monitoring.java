package test.java;

import java.util.List;

import org.hibernate.Session;
import org.junit.Test;

import main.java.DataAccessObject;
import main.java.HibernateUtils;
import main.java.dtos.Game;
import main.java.dtos.Group;
import main.java.dtos.Stats;
import main.java.dtos.Team;
import main.java.services.GroupService;
import main.java.tools.AlphabeticalOrdering;

public class Monitoring {

	@Test
	public void testListTable() {

		Session session = HibernateUtils.getSessionFactory().openSession();

		DataAccessObject<Team> dao = new DataAccessObject<>(session);
		List<Team> items = dao.list("TEAMS");
		
		for(Team t : items)
			System.out.println(t);
		
		DataAccessObject<Stats> dao8 = new DataAccessObject<>(session);
		List<Stats> items8 = dao8.list("STATS");
		
		for(Stats t : items8)
			System.out.println(t);
		
		DataAccessObject<Game> dao2 = new DataAccessObject<>(session);
		List<Game> items2 = dao2.list("GAMES");
		
		for(Game t : items2)
			System.out.println(t);
		
		DataAccessObject<Group> dao3 = new DataAccessObject<>(session);
		List<Group> items3 = dao3.list("GROUPS");
		
		for(Group t : items3)
			System.out.println(t);
		
		session.close();

	}

	@Test
	public void testGetTeamsInMasterGroup() {

		Session session = HibernateUtils.getSessionFactory().openSession();

		GroupService groupService = new GroupService(session);

		DataAccessObject<Group> groupDao = new DataAccessObject<>(session);
		Group master = groupDao.listByField("GROUPS", "NAME", "master").get(0);

		List<Team> teams = groupService.getTeams(master, new AlphabeticalOrdering(master));

		System.out.println("name           W   D   L   GS   GC");

		for (Team t : teams) {

			Stats stats = t.getGroupStats().get(master);
			System.out.println(t.getName() + "   " + stats.getWins() + " " + stats.getDraws() + " " + stats.getLosses() + " "
					+ stats.getGoalsScored() + " " + stats.getGoalsConceded());

		}

		session.close();

	}
	
}
