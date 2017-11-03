package main.java.services;

import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Properties;

import org.apache.commons.io.FileUtils;
import org.apache.log4j.Logger;
import org.hibernate.Session;

import main.java.DataAccessObject;
import main.java.HibernateUtils;
import main.java.PropertyUtils;
import main.java.dtos.Stats;
import main.java.dtos.Team;
import main.java.dtos.groups.Group;

public class BootService {

	private static final String TEAMS_FILE = "main/resources/teams.txt";

	final static Logger logger = Logger.getLogger(BootService.class);
	
	private Session session = HibernateUtils.getSession();
	
	public void start() {

		Properties properties = PropertyUtils.load();
	
		if(properties.getProperty("first_boot").equals("0")) {
			createMasterGroup();
			registerTeamsFromFile();
			properties.setProperty("first_boot", "1");
			PropertyUtils.save(properties);
		}
		
	}
	
	private void createMasterGroup() {
		logger.info("creating master group...");

		Group group = new Group("master");
		
		DataAccessObject<Group> groupDao = new DataAccessObject<>(session);
		groupDao.save(group);
		
	}

	private void registerTeamsFromFile() {
		
		logger.info("loading teams from file");

		try {

			File file = new File(TEAMS_FILE);

			if (!file.exists()) {
				logger.error("teams file not found");
				return;
			}

			List<String> teams = FileUtils.readLines(file, StandardCharsets.UTF_8);

			Group master = ServiceUtils.getMasterGroup(session);
			
			if(master == null) {
				logger.error("master group does not exist");
				return;
			}

			for (String tt : teams) {
				
				String teamName = tt.trim();
			
				logger.info("adding " + teamName);

				Team team = new Team(teamName);
				
				master.addTeam(team);
				
			}
			
			DataAccessObject<Group> groupDao = new DataAccessObject<>(session);
			groupDao.save(master);
			
		} catch (IOException e) {
			e.printStackTrace();
		}

	}

}
