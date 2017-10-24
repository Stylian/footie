package main.java.services;

import java.util.List;
import java.util.Properties;

import org.apache.log4j.Logger;
import org.hibernate.Session;

import main.java.DataAccessObject;
import main.java.PropertyUtils;
import main.java.dtos.Season;
import main.java.dtos.Stats;
import main.java.dtos.Team;
import main.java.dtos.rounds.QualsRound;

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

		Season season = new Season(year);

		TeamsService teamService = new TeamsService(session);

		List<Team> teams = teamService.listAll();

		for (Team team : teams) {

			new Stats(season, team);

		}

		DataAccessObject<Season> dao = new DataAccessObject<>(session);
		dao.save(season);
		
	}

	public Season loadCurrentSeason() {

		Properties properties = PropertyUtils.load();
		String strSeasonNum = properties.getProperty("season");

		DataAccessObject<Season> dao = new DataAccessObject<>(session);
		Season season = dao.listByField("GROUPS", "SEASON_YEAR", strSeasonNum).get(0);

		return season;

	}

	public void createQualsRound() {

		TeamsService teamService = new TeamsService(session);
		List<Team> teams = teamService.listAll();

		Season season = loadCurrentSeason();

		QualsRound qualsRound = new QualsRound(season);

		
		
		
		DataAccessObject<Season> seasonDao = new DataAccessObject<>(session);
		seasonDao.save(season);

	}

}
