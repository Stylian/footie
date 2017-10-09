package main.java.services;

import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.List;

import org.apache.commons.io.FileUtils;
import org.apache.log4j.Logger;
import org.hibernate.Session;

import main.java.DataAccessObject;
import main.java.dtos.Team;

public class TeamsLoaderService {

	final static Logger logger = Logger.getLogger(TeamsLoaderService.class);

	private static final String TEAMS_FILE = "main/resources/teams.txt";

	private Session session;

	public TeamsLoaderService(Session session) {
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
			for (String team : teams) {

				String t = team.trim();
				logger.info("adding " + t);
				
				teamDao.save(new Team(t));

			}

		} catch (IOException e) {
			e.printStackTrace();
		}

	}

}
