package main.java.services;

import org.apache.log4j.Logger;
import org.hibernate.Session;

import main.java.DataAccessObject;
import main.java.dtos.Group;
import main.java.dtos.Stats;
import main.java.dtos.Team;

public class TeamsService {

	final static Logger logger = Logger.getLogger(TeamsService.class);

	private static final String TEAMS_FILE = "main/resources/teams.txt";

	private Session session;

	public TeamsService(Session session) {
		this.session = session;
	}

	public void addTeamToGroup(Group group, Team team) {
		
		Stats stats = new Stats(group, team);
		stats.setGroup(group);
		stats.setTeam(team);
		
		group.addTeamStats(team, stats);
		
		team.addGroupStats(group, stats);

		DataAccessObject<Stats> statsDao = new DataAccessObject<>(session);
		statsDao.save(stats);
		
		
	}

}
