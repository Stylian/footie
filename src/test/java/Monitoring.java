package test.java;

import java.util.List;

import org.hibernate.Session;
import org.junit.Test;

import main.java.service.peristence.HibernateUtils;
import main.java.service.peristence.dtos.Stats;
import main.java.service.peristence.dtos.Team;
import main.java.service.peristence.dtos.games.Game;
import main.java.service.peristence.dtos.games.GroupGame;
import main.java.service.peristence.dtos.games.Result;
import main.java.service.peristence.dtos.groups.Group;
import main.java.service.peristence.dtos.groups.RobinGroup;
import main.java.service.peristence.dtos.groups.Season;
import main.java.service.peristence.dtos.matchups.Matchup;
import main.java.service.peristence.dtos.rounds.GroupsRound;
import main.java.service.peristence.dtos.rounds.PlayoffsRound;
import main.java.service.peristence.dtos.rounds.QualsRound;
import main.java.service.peristence.dtos.rounds.Round;
import main.java.service.services.GroupService;
import main.java.service.services.ServiceUtils;
import main.java.service.tools.CoefficientsOrdering;

public class Monitoring {

	@Test
	public void displayMetastats() {

		Session session = HibernateUtils.getSession();
		
		List<Result> results = session.createQuery("from RESULTS", Result.class).list();
		
		System.out.println("number of games played: " + results.size());
		System.out.println("average goals scored: " + results.stream().mapToDouble(Result::getGoalsMadeByHomeTeam).average().getAsDouble());
		System.out.println("average goals conceded: " + results.stream().mapToDouble(Result::getGoalsMadeByAwayTeam).average().getAsDouble());
		System.out.println("wins " + results.stream().filter(Result::homeTeamWon).count());
		System.out.println("ties " + results.stream().filter(Result::tie).count());
		System.out.println("losses " + results.stream().filter(Result::awayTeamWon).count());
		
	}

	@Test
	public void displayCoefficients() {

		Session session = HibernateUtils.getSession();

		GroupService groupService = new GroupService(session);

		Group master = ServiceUtils.getMasterGroup();
		Season season = ServiceUtils.loadCurrentSeason();

		List<Team> teams1 = groupService.getTeams(master, new CoefficientsOrdering());

		displayGroup(master, teams1);

		session.close();

	}

	private void displayGroup(Group master, List<Team> teams) {
		System.out.println("name                              coeff W   D   L   GS   GC");

		for (Team t : teams) {

			Stats stats = t.getGroupStats().get(master);
			int padding = 30 - t.getName().length();
			String pad = "";
			for (int count = 0; count < padding; count++)
				pad += " ";

			System.out
					.println(t.getName() + "   " + pad + stats.getPoints() + "   " + stats.getWins() + "   " + stats.getDraws()
							+ "   " + stats.getLosses() + "   " + stats.getGoalsScored() + "   " + stats.getGoalsConceded());

		}
	}

	@Test
	public void displaySeason(int year) {
		
		Session session = HibernateUtils.getSession();
		
		Season season = (Season) session.createQuery("from GROUPS where discriminator='S' and SEASON_YEAR=" + year, Group.class)
				.getSingleResult();

		displaySeason(season);
		
	}
	
	public void displaySeason(Season season) {

		System.out.println(season);
		System.out.println("");
		System.out.println("");

		List<Round> rounds = season.getRounds();

		displayQuals1(rounds);

		displayQuals2(rounds);

		displayRoundOf12(rounds);

		displayRoundOf8(rounds);

		displayPlayoffs(rounds);

		System.out.println("season winner: " + season.getWinner());
		
	}

	private void displayQuals1(List<Round> rounds) {
		QualsRound qualsRound1 = (QualsRound) rounds.get(0);

		System.out.println(qualsRound1.getName());
		System.out.println("----------------------");
		System.out.println("");

		System.out.println("-----strong seeds ---------");
		for (Team t : qualsRound1.getStrongTeams())
			System.out.println(t);

		System.out.println("");
		System.out.println("-----weak seeds ---------");
		for (Team t : qualsRound1.getWeakTeams())
			System.out.println(t);

		for (Matchup m : qualsRound1.getMatchups()) {
			System.out.println("#########################");
			for (Game g : m.getGames())
				System.out.println(g);
		}
	}

	private void displayQuals2(List<Round> rounds) {
		QualsRound qualsRound2 = (QualsRound) rounds.get(1);

		System.out.println(qualsRound2.getName());
		System.out.println("----------------------");
		System.out.println("");

		System.out.println("-----strong seeds ---------");
		for (Team t : qualsRound2.getStrongTeams())
			System.out.println(t);

		System.out.println("");
		System.out.println("-----weak seeds ---------");
		for (Team t : qualsRound2.getWeakTeams())
			System.out.println(t);

		for (Matchup m : qualsRound2.getMatchups()) {
			System.out.println("#########################");
			for (Game g : m.getGames())
				System.out.println(g);
		}
	}

	private void displayRoundOf12(List<Round> rounds) {
		GroupsRound groupsRound12 = (GroupsRound) rounds.get(2);

		System.out.println(groupsRound12.getName());
		System.out.println("----------------------");
		System.out.println("");

		System.out.println("-----strong seeds ---------");
		for (Team t : groupsRound12.getStrongTeams())
			System.out.println(t);

		System.out.println("-----medium seeds ---------");
		for (Team t : groupsRound12.getMediumTeams())
			System.out.println(t);

		System.out.println("-----weak seeds ---------");
		for (Team t : groupsRound12.getWeakTeams())
			System.out.println(t);

		for (RobinGroup robinGroup : groupsRound12.getGroups()) {
			System.out.println("-----------------------");
			System.out.println(robinGroup.getName());

			System.out.println("name                            coeff W   D   L   GS   GC");
			for (Team t : robinGroup.getTeamsOrdered()) {
				Stats stats = t.getGroupStats().get(robinGroup);
				int padding = 30 - t.getName().length();
				String pad = "";
				for (int count = 0; count < padding; count++)
					pad += " ";
				System.out
						.println(t.getName() + "   " + pad + stats.getPoints() + "   " + stats.getWins() + "   " + stats.getDraws()
								+ "   " + stats.getLosses() + "   " + stats.getGoalsScored() + "   " + stats.getGoalsConceded());
			}

			for (GroupGame g : robinGroup.getGames())
				System.out.println(g);

		}
	}

	private void displayRoundOf8(List<Round> rounds) {
		GroupsRound groupsRound8 = (GroupsRound) rounds.get(3);

		for (RobinGroup robinGroup : groupsRound8.getGroups()) {
			System.out.println("-----------------------");
			System.out.println(robinGroup.getName());

			System.out.println("name                            coeff W   D   L   GS   GC");
			for (Team t : robinGroup.getTeamsOrdered()) {
				Stats stats = t.getGroupStats().get(robinGroup);
				int padding = 30 - t.getName().length();
				String pad = "";
				for (int count = 0; count < padding; count++)
					pad += " ";
				System.out
						.println(t.getName() + "   " + pad + stats.getPoints() + "   " + stats.getWins() + "   " + stats.getDraws()
								+ "   " + stats.getLosses() + "   " + stats.getGoalsScored() + "   " + stats.getGoalsConceded());
			}

			for (GroupGame g : robinGroup.getGames())
				System.out.println(g);

		}
	}

	private void displayPlayoffs(List<Round> rounds) {
		PlayoffsRound playoffsRound = (PlayoffsRound) rounds.get(4);

		System.out.println(playoffsRound.getName());
		for (Matchup m : playoffsRound.getQuarterMatchups()) {
			System.out.println("#########################");
			for (Game g : m.getGames())
				System.out.println(g);
		}
		for (Matchup m : playoffsRound.getSemisMatchups()) {
			System.out.println("#########################");
			for (Game g : m.getGames())
				System.out.println(g);
		}

		Matchup fm = playoffsRound.getFinalsMatchup();
		System.out.println("#########################");
		for (Game g : fm.getGames())
			System.out.println(g);
	}

}
