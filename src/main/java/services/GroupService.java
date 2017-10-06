package main.java.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.hibernate.Session;

import main.java.dtos.Group;
import main.java.dtos.Stats;
import main.java.dtos.Team;

public class GroupService {
	
	private Session session;
	
	public GroupService(Session session) {
		this.session = session;
	}
	
	public List<Team> getTeams(Group group) {
		
		Map<Team,Stats> teamsWithStats = group.getTeamsWithStats();
		
		List<Team> teams = new ArrayList<>();
		
		for (Team team : teamsWithStats.keySet()) {
			teams.add(team);
		}
		
		return teams;
		
	}
	
}
