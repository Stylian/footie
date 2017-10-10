package main.java.services;

import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.Session;

import main.java.DataAccessObject;
import main.java.dtos.Group;
import main.java.dtos.Team;

public class SeasonService {

	final static Logger logger = Logger.getLogger(SeasonService.class);

	private Session session;

	public SeasonService(Session session) {
		this.session = session;
	}

	public void createSeason() {
		
		int year = 1; // todo
		
		logger.info("creating season " + year);

		Group group = new Group();
		group.setName("season-" + year);
		
		DataAccessObject<Team> dao = new DataAccessObject<>(session);
		List<Team> teams = dao.list("TEAMS");
		
		TeamsService teamService = new TeamsService(session);

		for(Team team : teams) {
			
			teamService.addTeamToGroup(group, team);
		
		}
		
	}
	
}
