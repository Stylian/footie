package core.services;

import java.util.List;
import java.util.Properties;

import org.apache.log4j.Logger;
import org.hibernate.Session;

import core.PropertyUtils;
import core.Utils;
import core.peristence.DataAccessObject;
import core.peristence.HibernateUtils;
import core.peristence.dtos.Team;
import core.peristence.dtos.groups.Season;
import core.peristence.dtos.rounds.GroupsRound;
import core.peristence.dtos.rounds.PlayoffsRound;

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
	
	public void seedAndSetSemifinals() {
		logger.info("seed and set semifinals");
	
		Season season = ServiceUtils.loadCurrentSeason();

		PlayoffsRound playoffsRound = (PlayoffsRound) season.getRounds().get(4);
		playoffsRound.buildSemisMatchups();
		
		DataAccessObject<PlayoffsRound> roundDao = new DataAccessObject<>(session);
		roundDao.save(playoffsRound);
		
		Properties properties = PropertyUtils.load();
		properties.setProperty("semifinals", "2");
		PropertyUtils.save(properties);
		
	}
	
	public void seedAndSetfinals() {
		logger.info("seed and set finals");
		
		Season season = ServiceUtils.loadCurrentSeason();

		PlayoffsRound playoffsRound = (PlayoffsRound) season.getRounds().get(4);
		playoffsRound.buildFinalsMatchup();
		
		DataAccessObject<PlayoffsRound> roundDao = new DataAccessObject<>(session);
		roundDao.save(playoffsRound);
		
		Properties properties = PropertyUtils.load();
		properties.setProperty("finals", "2");
		PropertyUtils.save(properties);
	}
	
}
