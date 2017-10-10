package main.java.services;

import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.List;

import org.apache.commons.io.FileUtils;
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

	public void loadTeams() {
		logger.info("loading teams from file");

		try {

			File file = new File(TEAMS_FILE);

			if (!file.exists()) {
				logger.error("teams file not found");
				return;
			}

			List<String> teams;

			teams = FileUtils.readLines(file, StandardCharsets.UTF_8);

			DataAccessObject<Team> teamDao = new DataAccessObject<>(session);

			for (String tt : teams) {
				
				String team = tt.trim();

				List<Team> existingRows = teamDao.listByField("TEAMS", "NAME", team);
				
				if(existingRows.size() == 0) {
				
					logger.info("adding " + team);
					teamDao.save(new Team(team));

				}
				
			}
		} catch (IOException e) {
			e.printStackTrace();
		}

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
