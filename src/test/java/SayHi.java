package test.java;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
		
//		group.setTeams(Arrays.asList(t1, t2, t3, t4));
		group.setGames(Arrays.asList(game1, game2, game3));

		Map<Team, Stats> teamsStats = new HashMap<>();
		
		Stats s1 =  new Stats(group, t1);
		Stats s2 =  new Stats(group, t2);
		Stats s3 =  new Stats(group, t3);
		Stats s4 =  new Stats(group, t4);

		Map<Group, Stats> gs1 = new HashMap<>();
		gs1.put(group, s1);
		t1.setGroupStats(gs1);
		
		Map<Group, Stats> gs2 = new HashMap<>();
		gs2.put(group, s2);
		t2.setGroupStats(gs2);
		
		Map<Group, Stats> gs3 = new HashMap<>();
		gs3.put(group, s3);
		t3.setGroupStats(gs3);
		
		Map<Group, Stats> gs4 = new HashMap<>();
		gs4.put(group, s4);
		t4.setGroupStats(gs4);
		
		teamsStats.put(t1, s1);
		teamsStats.put(t2, s2);
		teamsStats.put(t3, s3);
		teamsStats.put(t4, s4);
		
		group.setTeamsStats(teamsStats);
		
		
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
