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

public class SayHi {
	
	@Test
	public void testDaoGetById() {

		Session session = HibernateUtils.getSessionFactory().openSession();

		DataAccessObject<Team> dao = new DataAccessObject<>(session);
		Team team = (Team) dao.getById(1, Team.class);
		
		System.out.println(team.getName() + "  " + team.getId());

		session.close();

	}
	
	@Test
	public void testDaoUpdate() {
		
		Session session = HibernateUtils.getSessionFactory().openSession();
		
		DataAccessObject<Team> dao = new DataAccessObject<>(session);
		Team team = (Team) dao.getById(1, Team.class);
		
		team.setName("team 3 actually");
		
		long id = dao.save(team);

		System.out.println(id);
		
		
		session.close();
		
	}

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

}
