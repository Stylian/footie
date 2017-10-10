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
import main.java.dtos.Team;

public class BootService {

	private static final String TEAMS_FILE = "main/resources/teams.txt";

	final static Logger logger = Logger.getLogger(BootService.class);
	
	private Session session;

	public BootService(Session session) {
		this.session = session;
	}
	
	public void createMasterGroup() {
		logger.info("creating master group...");

		Group group = new Group();
		group.setName("master");
		
		DataAccessObject<Group> groupDao = new DataAccessObject<>(session);
		groupDao.save(group);
		
	}

	public void registerTeams() {
		
		logger.info("loading teams from file");

		try {

			File file = new File(TEAMS_FILE);

			if (!file.exists()) {
				logger.error("teams file not found");
				return;
			}

			List<String> teams = FileUtils.readLines(file, StandardCharsets.UTF_8);

			DataAccessObject<Group> groupDao = new DataAccessObject<>(session);
			Group master = groupDao.listByField("GROUPS", "NAME", "master").get(0);
			
			if(master == null) {
				logger.error("master group does not exist");
				return;
			}
			
			TeamsService teamService = new TeamsService(session);

			for (String tt : teams) {
				
				String teamName = tt.trim();
			
				logger.info("adding " + teamName);

				Team team = new Team(teamName);
				
				teamService.addTeamToGroup(master, team);
				
			}
		} catch (IOException e) {
			e.printStackTrace();
		}

	}

}
