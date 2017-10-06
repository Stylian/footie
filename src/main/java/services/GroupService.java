package main.java.services;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.hibernate.Session;

import main.java.dtos.Group;
import main.java.dtos.Stats;
import main.java.dtos.Team;
import main.java.tools.OrderingStrategy;

public class GroupService {
	
	private Session session;
	
	public GroupService(Session session) {
		this.session = session;
	}
	
	public List<Team> getTeams(Group group) {
		return getTeams(group, null);
	}
		
	public List<Team> getTeams(Group group, OrderingStrategy orderingStrategy) {
		
		Map<Team,Stats> teamsWithStats = group.getTeamsWithStats();
		
		List<Team> teams = new ArrayList<>();
		
		for (Team team : teamsWithStats.keySet()) {
			teams.add(team);
		}
		
		if (orderingStrategy != null) {
			Collections.sort(teams,
				(Team t1, Team t2) -> {
					
					Stats s1 = getStatsForTeam(group, t1);
					Stats s2 = getStatsForTeam(group, t2);
					
					// ? terrible ???
					
					return 1;
				
				}
			);
		}
		
		return teams;
		
	}
	
	public Stats getStatsForTeam(Group group, Team team) {
	
		Map<Team,Stats> teamsWithStats = group.getTeamsWithStats();
		
		return teamsWithStats.get(team);

	}
	
}
