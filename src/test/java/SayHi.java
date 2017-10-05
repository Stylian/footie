package test.java;

import java.util.Arrays;
import java.util.List;

import org.hibernate.Session;
import org.junit.Test;

import main.java.DataAccessObject;
import main.java.HibernateUtils;
import main.java.dtos.Game;
import main.java.dtos.Group;
import main.java.dtos.Team;

public class SayHi {

	@Test
	public void laa() throws Exception {

		
	}
	
	@Test
	public void addGroup() throws Exception {

		Session session = HibernateUtils.getSessionFactory().openSession();

		Team t1 = new Team("Arsenal");
		Team t2 = new Team("Chelsea");
		Team t3 = new Team("Leeds");
		Team t4 = new Team("Man U");
		
		Game game1 = new Game();
		game1.setAwayTeam(t1);
		game1.setHomeTeam(t2);

		Game game2 = new Game();
		game2.setAwayTeam(t3);
		game2.setHomeTeam(t2);

		Game game3 = new Game();
		game3.setAwayTeam(t4);
		game3.setHomeTeam(t1);
		
		Group group = new Group();
		
		group.setTeams(Arrays.asList(t1, t2, t3, t4));
		group.setGames(Arrays.asList(game1, game2, game3));
		
		
		DataAccessObject<Group> dao = new DataAccessObject<>(session);
		long id = dao.save(group);

		System.out.println(group);
		System.out.println(id);

		session.close();

	}

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
