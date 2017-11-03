package test.java;

import java.util.List;

import org.hibernate.Session;
import org.junit.Test;

import main.java.HibernateUtils;
import main.java.dtos.Matchup;
import main.java.dtos.Stats;
import main.java.dtos.Team;
import main.java.dtos.games.Game;
import main.java.dtos.games.GroupGame;
import main.java.dtos.groups.Group;
import main.java.dtos.groups.RobinGroup;
import main.java.dtos.groups.Season;
import main.java.dtos.rounds.GroupsRound;
import main.java.dtos.rounds.QualsRound;
import main.java.dtos.rounds.Round;
import main.java.services.GroupService;
import main.java.services.ServiceUtils;
import main.java.tools.CoefficientsOrdering;

public class Monitoring {

	@Test
	public void displayCoefficients() {

		Session session = HibernateUtils.getSession();

		GroupService groupService = new GroupService(session);

		Group master = ServiceUtils.getMasterGroup();
		Season season = ServiceUtils.loadCurrentSeason();
		
		List<Team> teams1 = groupService.getTeams(master, new CoefficientsOrdering(master));
		List<Team> teams2 = groupService.getTeams(season, new CoefficientsOrdering(season));

		displayGroup(master, teams1);
		displayGroup(season, teams2);

		session.close();

	}

	private void displayGroup(Group master, List<Team> teams) {
		System.out.println("name                              coeff W   D   L   GS   GC");

		for (Team t : teams) {

			Stats stats = t.getGroupStats().get(master);
			int padding = 30 - t.getName().length();
			String pad = "";
			for(int count=0; count < padding; count++)
				pad += " ";
			
			System.out.println(t.getName() + "   " + pad + stats.getPoints() + "   " + stats.getWins() + "   " + stats.getDraws() + "   " + stats.getLosses() + "   "
					+ stats.getGoalsScored() + "   " + stats.getGoalsConceded());

		}
	}
	
	@Test
	public void displaySeason1() {

		Session session = HibernateUtils.getSession();

		Season season = (Season) session.createQuery("from GROUPS where discriminator='S' and SEASON_YEAR=1", Group.class).getSingleResult();
		
		System.out.println(season);
		System.out.println("");
		System.out.println("");
		
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
		
		GroupsRound groupsRound12 = (GroupsRound) rounds.get(2);
		
		System.out.println(groupsRound12.getName());
		System.out.println("----------------------");
		System.out.println("");
		
		System.out.println("-----strong seeds ---------");
		for(Team t : groupsRound12.getStrongTeams())
			System.out.println(t);

		System.out.println("-----medium seeds ---------");
		for(Team t : groupsRound12.getMediumTeams())
			System.out.println(t);
		
		System.out.println("-----weak seeds ---------");
		for(Team t : groupsRound12.getWeakTeams())
			System.out.println(t);

		for(RobinGroup robinGroup : groupsRound12.getGroups()) {
			System.out.println("-----------------------");
			System.out.println(robinGroup.getName());
			
			System.out.println("name                            coeff W   D   L   GS   GC");
			for(Team t : robinGroup.getTeams()) {
				Stats stats = t.getGroupStats().get(robinGroup);
				int padding = 30 - t.getName().length();
				String pad = "";
				for(int count=0; count < padding; count++)
					pad += " ";
				System.out.println(t.getName() + "   " + pad + stats.getPoints() + "   " + stats.getWins() + "   " + stats.getDraws() + "   " + stats.getLosses() + "   "
						+ stats.getGoalsScored() + "   " + stats.getGoalsConceded());
			}
			
			for(GroupGame g : robinGroup.getGames())
				System.out.println(g);
			
		}
		
		
		
		
		
		
		session.close();

	}

}
