package core.services;

import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.List;

import org.apache.commons.io.FileUtils;
import org.apache.log4j.Logger;
import org.hibernate.Session;

import core.peristence.DataAccessObject;
import core.peristence.HibernateUtils;
import core.peristence.dtos.League;
import core.peristence.dtos.Team;
import core.peristence.dtos.groups.Group;

public class BootService {

	private static final String TEAMS_FILE = "src/main/resources/teams.txt";

	final static Logger logger = Logger.getLogger(BootService.class);
	
	private Session session = HibernateUtils.getSession();
	
	public League loadLeague() {

		League league = ServiceUtils.getLeague();
		
		if(league == null) {
			
			createMasterGroup();
			registerTeamsFromFile();
			
			league = new League();
			league.save();
			
		}
		
		return league;
		
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

			Group master = ServiceUtils.getMasterGroup();
			
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
