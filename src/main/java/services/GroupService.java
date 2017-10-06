package main.java.services;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.hibernate.Session;

import main.java.DataAccessObject;
import main.java.dtos.Group;
import main.java.dtos.Stats;
import main.java.dtos.Team;
import main.java.tools.Ordering;

public class GroupService {
	
	private Session session;
	
	public GroupService(Session session) {
		this.session = session;
	}
	
	public List<Team> getTeams(Group group) {
		return getTeams(group, null);
	}
		
	public List<Team> getTeams(Group group, Ordering orderingStrategy) {
		
		Map<Team,Stats> teamsWithStats = group.getTeamsStats();
		
		List<Team> teams = new ArrayList<>();
		
		for (Team team : teamsWithStats.keySet()) {
			teams.add(team);
		}
		
		if (orderingStrategy != null) {
			Collections.sort(teams, orderingStrategy);
		}
		
		return teams;
		
	}
	
	public long createGroup(List<Team> teams) {
		
		//TODO set games

		Group group = new Group();
		
		for (Team team : teams) {
			
			Stats stats =  new Stats(group, team);
			group.addTeamStats(team, stats);
			team.addGroupStats(group, stats);
			
		}
		
		DataAccessObject<Group> dao = new DataAccessObject<>(session);
		long id = dao.save(group);
		
		return id;
		
	}
	
}
