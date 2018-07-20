package core.services;

import java.util.List;

import javax.transaction.Transactional;

import org.apache.log4j.Logger;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import core.Utils;
import core.peristence.DataAccessObject;
import core.peristence.dtos.League;
import core.peristence.dtos.LeagueStage;
import core.peristence.dtos.Team;
import core.peristence.dtos.groups.Group;
import core.peristence.dtos.groups.Season;
import core.peristence.dtos.rounds.GroupsRound;
import core.peristence.dtos.rounds.PlayoffsRound;

@Service
@Transactional
public class PlayoffsRoundService {

	final static Logger logger = Logger.getLogger(PlayoffsRoundService.class);

	@Autowired
	private SessionFactory sessionFactory;
	
	@Autowired
	private ServiceUtils serviceUtils;

	public PlayoffsRound seedAndSetQuarterfinals() {
		logger.info("seed and set quarterfinals");

		Season season = serviceUtils.loadCurrentSeason();
		Group master = serviceUtils.getMasterGroup();
		
		// build playoffs round
		PlayoffsRound playoffsRound = new PlayoffsRound(season, "Playoffs");

		// add winners from roundof8
		GroupsRound groupsRoundOf8 = (GroupsRound) season.getRounds().get(3);

		List<Team> teamsA = groupsRoundOf8.getGroups().get(0).getTeamsOrdered(master);
		logger.info("teams from group A:" + Utils.toString(teamsA));
		playoffsRound.setgA1(teamsA.get(0));
		playoffsRound.setgA2(teamsA.get(1));
		playoffsRound.setgA3(teamsA.get(2));

		List<Team> teamsB = groupsRoundOf8.getGroups().get(1).getTeamsOrdered(master);
		logger.info("teams from group B:" + Utils.toString(teamsB));
		playoffsRound.setgB1(teamsB.get(0));
		playoffsRound.setgB2(teamsB.get(1));
		playoffsRound.setgB3(teamsB.get(2));

		logger.info("building quarterfinals ");
		playoffsRound.buildQuarterMatchups();
		
		DataAccessObject<PlayoffsRound> roundDao = new DataAccessObject<>(sessionFactory.getCurrentSession());
		roundDao.save(playoffsRound);
		
		League league = serviceUtils.getLeague();
		league.setQuarterfinals(LeagueStage.PLAYING);
		DataAccessObject<League> dao2 = new DataAccessObject<>(sessionFactory.getCurrentSession());
		dao2.save(league);
		
		return playoffsRound;
		
	}
	
	public PlayoffsRound seedAndSetSemifinals() {
		logger.info("seed and set semifinals");
	
		Season season = serviceUtils.loadCurrentSeason();

		PlayoffsRound playoffsRound = (PlayoffsRound) season.getRounds().get(4);
		playoffsRound.buildSemisMatchups();
		
		DataAccessObject<PlayoffsRound> roundDao = new DataAccessObject<>(sessionFactory.getCurrentSession());
		roundDao.save(playoffsRound);

		League league = serviceUtils.getLeague();
		league.setSemifinals(LeagueStage.PLAYING);
		DataAccessObject<League> dao2 = new DataAccessObject<>(sessionFactory.getCurrentSession());
		dao2.save(league);
		
		return playoffsRound;
		
	}
	
	public PlayoffsRound seedAndSetfinals() {
		logger.info("seed and set finals");
		
		Season season = serviceUtils.loadCurrentSeason();

		PlayoffsRound playoffsRound = (PlayoffsRound) season.getRounds().get(4);
		playoffsRound.buildFinalsMatchup();
		
		DataAccessObject<PlayoffsRound> roundDao = new DataAccessObject<>(sessionFactory.getCurrentSession());
		roundDao.save(playoffsRound);
		
		League league = serviceUtils.getLeague();
		league.setFinals(LeagueStage.PLAYING);
		DataAccessObject<League> dao2 = new DataAccessObject<>(sessionFactory.getCurrentSession());
		dao2.save(league);
		
		return playoffsRound;
		
	}
	
}
