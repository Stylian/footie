package main.java.services;

import java.util.List;
import java.util.Properties;

import org.apache.log4j.Logger;
import org.hibernate.Session;

import main.java.DataAccessObject;
import main.java.HibernateUtils;
import main.java.PropertyUtils;
import main.java.Utils;
import main.java.dtos.Team;
import main.java.dtos.groups.Season;
import main.java.dtos.rounds.GroupsRound;
import main.java.dtos.rounds.PlayoffsRound;

public class PlayoffsRoundService {

	final static Logger logger = Logger.getLogger(PlayoffsRoundService.class);

	private Session session = HibernateUtils.getSession();

	public void seedAndSetQuarterfinals() {
		logger.info("seed and set quarterfinals");

		Season season = ServiceUtils.loadCurrentSeason();

		// build playoffs round
		PlayoffsRound playoffsRound = new PlayoffsRound(season, "Playoffs");

		// add winners from roundof8
		GroupsRound groupsRoundOf8 = (GroupsRound) season.getRounds().get(3);

		List<Team> teamsA = groupsRoundOf8.getGroups().get(0).getTeamsOrdered();
		logger.info("teams from group A:" + Utils.toString(teamsA));
		playoffsRound.setgA1(teamsA.get(0));
		playoffsRound.setgA2(teamsA.get(1));
		playoffsRound.setgA3(teamsA.get(2));

		List<Team> teamsB = groupsRoundOf8.getGroups().get(1).getTeamsOrdered();
		logger.info("teams from group B:" + Utils.toString(teamsB));
		playoffsRound.setgB1(teamsB.get(0));
		playoffsRound.setgB2(teamsB.get(1));
		playoffsRound.setgB3(teamsB.get(2));

		logger.info("building quarterfinals ");
		playoffsRound.buildQuarterMatchups();
		
		
		DataAccessObject<PlayoffsRound> roundDao = new DataAccessObject<>(session);
		roundDao.save(playoffsRound);
		
		Properties properties = PropertyUtils.load();
		properties.setProperty("quarterfinals", "2");
		PropertyUtils.save(properties);
		
	}

}
