package test.java;

import java.util.List;

import org.hibernate.Session;
import org.junit.Test;

import main.java.DataAccessObject;
import main.java.HibernateUtils;
import main.java.dtos.Game;
import main.java.dtos.Matchup;
import main.java.dtos.Stats;
import main.java.dtos.Team;
import main.java.dtos.groups.Group;
import main.java.dtos.groups.Season;
import main.java.dtos.rounds.QualsRound;
import main.java.dtos.rounds.Round;
import main.java.services.GroupService;
import main.java.services.SeasonService;
import main.java.tools.AlphabeticalOrdering;

public class Monitoring {

	@Test
	public void displaySeason1() {

		Session session = HibernateUtils.getSessionFactory().openSession();

		Season season = (Season) session.createQuery("from GROUPS where discriminator='S' and SEASON_YEAR=1", Group.class).getSingleResult();
		
		System.out.println(season);
		
		List<Round> rounds = season.getRounds();
		
		QualsRound qualsRound1 = (QualsRound) rounds.get(0);
		
		System.out.println(qualsRound1.getName());
		System.out.println("----------------------");
		System.out.println("");
		
		System.out.println("-----strong seeds ---------");
		for(Team t : qualsRound1.getStrongTeams())
			System.out.println(t);

		System.out.println("");
		System.out.println("-----weak seeds ---------");
		for(Team t : qualsRound1.getWeakTeams())
			System.out.println(t);
		
		for(Matchup m : qualsRound1.getMatchups()) {
			System.out.println("#########################");
			for(Game g: m.getGames())
				System.out.println(g);
		}
		
		QualsRound qualsRound2 = (QualsRound) rounds.get(1);
		
		System.out.println(qualsRound2.getName());
		System.out.println("----------------------");
		System.out.println("");
		
		System.out.println("-----strong seeds ---------");
		for(Team t : qualsRound2.getStrongTeams())
			System.out.println(t);

		System.out.println("");
		System.out.println("-----weak seeds ---------");
		for(Team t : qualsRound2.getWeakTeams())
			System.out.println(t);
		
		for(Matchup m : qualsRound2.getMatchups()) {
			System.out.println("#########################");
			for(Game g: m.getGames())
				System.out.println(g);
		}
		
		
		
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
	
	@Test
	public void testLoadCurrentSeason() throws Exception {
		
		Session session = HibernateUtils.getSessionFactory().openSession();
		
		SeasonService service = new SeasonService(session);
		Season season = service.loadCurrentSeason();
		
		System.out.println(season);
		
		session.close();
		
	}
	
}
