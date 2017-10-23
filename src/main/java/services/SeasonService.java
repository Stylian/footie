package main.java.services;

import java.util.List;
import java.util.Properties;

import org.apache.log4j.Logger;
import org.hibernate.Session;

import main.java.DataAccessObject;
import main.java.PropertyUtils;
import main.java.dtos.Group;
import main.java.dtos.Season;
import main.java.dtos.Team;

public class SeasonService {

	final static Logger logger = Logger.getLogger(SeasonService.class);

	private Session session;

	public SeasonService(Session session) {
		this.session = session;
	}

	public void createSeason() {
		
		Properties properties = PropertyUtils.load();
		String strSeasonNum = properties.getProperty("season");

		int year = Integer.parseInt(strSeasonNum) + 1;
		properties.setProperty("season", Integer.toString(year));
		PropertyUtils.save(properties);
		
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
		
	public Season loadCurrentSeason() {
		
		Properties properties = PropertyUtils.load();
		String strSeasonNum = properties.getProperty("season");
		
		DataAccessObject<Season> dao = new DataAccessObject<>(session);
		Season season = dao.listByField("SEASONS", "YEAR", strSeasonNum).get(0);
		
		return season;
		
	}
	
//	public void createQualsRound() {
//		
//		//load team TODO
//		
//		Properties properties = PropertyUtils.load();
//		String strSeasonNum = properties.getProperty("season");
//		
//		int year = Integer.parseInt(strSeasonNum) + 1;
//		properties.setProperty("season", Integer.toString(year));
//		PropertyUtils.save(properties);
//		
//		logger.info("creating season " + year);
//		
//		Group group = new Group();
//		group.setName("season-" + year);
//		
//		DataAccessObject<Team> dao = new DataAccessObject<>(session);
//		List<Team> teams = dao.list("TEAMS");
//		
//		TeamsService teamService = new TeamsService(session);
//		
//		for(Team team : teams) {
//			
//			teamService.addTeamToGroup(group, team);
//			
//		}
//		
//	}
	
}
