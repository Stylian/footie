package gr.manolis.stelios.footie.core.services;

import java.util.List;

import javax.transaction.Transactional;

import gr.manolis.stelios.footie.core.Rules;
import gr.manolis.stelios.footie.core.peristence.dtos.groups.Group;
import gr.manolis.stelios.footie.core.peristence.dtos.matchups.Matchup;
import org.apache.log4j.Logger;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import gr.manolis.stelios.footie.core.Utils;
import gr.manolis.stelios.footie.core.peristence.DataAccessObject;
import gr.manolis.stelios.footie.core.peristence.dtos.Stage;
import gr.manolis.stelios.footie.core.peristence.dtos.Team;
import gr.manolis.stelios.footie.core.peristence.dtos.groups.Season;
import gr.manolis.stelios.footie.core.peristence.dtos.rounds.GroupsRound;
import gr.manolis.stelios.footie.core.peristence.dtos.rounds.PlayoffsRound;

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

		// build playoffs round
		PlayoffsRound playoffsRound = new PlayoffsRound(season, "playoffs");

		// add winners from roundof8
		GroupsRound groupsRoundOf8 = (GroupsRound) season.getRounds().get(3);

		List<Team> teamsA = groupsRoundOf8.getGroups().get(0).getTeams();
		logger.info("teams from group A:" + Utils.toString(teamsA));
		playoffsRound.setgA1(teamsA.get(0));
		playoffsRound.setgA2(teamsA.get(1));
		playoffsRound.setgA3(teamsA.get(2));

		List<Team> teamsB = groupsRoundOf8.getGroups().get(1).getTeams();
		logger.info("teams from group B:" + Utils.toString(teamsB));
		playoffsRound.setgB1(teamsB.get(0));
		playoffsRound.setgB2(teamsB.get(1));
		playoffsRound.setgB3(teamsB.get(2));

		logger.info("building quarterfinals ");
		playoffsRound.buildQuarterMatchups();
		
		playoffsRound.setStage(Stage.PLAYING);
		groupsRoundOf8.setStage(Stage.FINISHED);
		
		DataAccessObject<Season> dao = new DataAccessObject<>(sessionFactory.getCurrentSession());
		dao.save(season);

		return playoffsRound;
	}

	public PlayoffsRound seedAndSetSemifinals() {
		logger.info("seed and set semifinals");

		Season season = serviceUtils.loadCurrentSeason();

		PlayoffsRound playoffsRound = (PlayoffsRound) season.getRounds().get(4);
		playoffsRound.buildSemisMatchups();

		DataAccessObject<Season> dao = new DataAccessObject<>(sessionFactory.getCurrentSession());
		dao.save(season);
		
		return playoffsRound;
	}

	public PlayoffsRound seedAndSetfinals() {
		logger.info("seed and set finals");

		Season season = serviceUtils.loadCurrentSeason();

		PlayoffsRound playoffsRound = (PlayoffsRound) season.getRounds().get(4);
		playoffsRound.buildFinalsMatchup();

		DataAccessObject<Season> dao = new DataAccessObject<>(sessionFactory.getCurrentSession());
		dao.save(season);

		return playoffsRound;

	}

	public void endPlayoffsQuarters() {
		logger.info("ending playoffs quarters");

		Season season = serviceUtils.loadCurrentSeason();
		Group master = serviceUtils.getMasterGroup();

		PlayoffsRound playoffsRound = (PlayoffsRound) season.getRounds().get(4);
		for (Matchup matchup : playoffsRound.getQuarterMatchups()) {
			// average out points per matchup
			Utils.addGamePointsForMatchup(season, matchup);
		}

		// pass to master
		List<Team> teams = serviceUtils.loadTeams();
		for (Team team : teams) {
			team.getStatsForGroup(master).addStats(team.getStatsForGroup(season));
		}

		//save
		DataAccessObject<Season> seasonDao = new DataAccessObject<>(sessionFactory.getCurrentSession());
		seasonDao.save(season);

	}

	public void endPlayoffsSemis() {
		logger.info("ending playoffs semis");

		Season season = serviceUtils.loadCurrentSeason();
		Group master = serviceUtils.getMasterGroup();

		PlayoffsRound playoffsRound = (PlayoffsRound) season.getRounds().get(4);
		for (Matchup matchup : playoffsRound.getSemisMatchups()) {
			// average out points per matchup
			Utils.addGamePointsForMatchup(season, matchup);
		}

		// pass to master
		List<Team> teams = serviceUtils.loadTeams();
		for (Team team : teams) {
			team.getStatsForGroup(master).addStats(team.getStatsForGroup(season));
		}

		//save
		DataAccessObject<Season> seasonDao = new DataAccessObject<>(sessionFactory.getCurrentSession());
		seasonDao.save(season);


	}

	public void endPlayoffsFinals() {
		logger.info("ending playoffs finals");

		Season season = serviceUtils.loadCurrentSeason();
		Group master = serviceUtils.getMasterGroup();

		PlayoffsRound playoffsRound = (PlayoffsRound) season.getRounds().get(4);
		Matchup finalsMatchup = playoffsRound.getFinalsMatchup();
		finalsMatchup.getWinner().getStatsForGroup(season).addPoints(Rules.POINTS_WINNING_THE_LEAGUE);
		if (!finalsMatchup.getTeamHome().equals(finalsMatchup.getWinner())) {
			finalsMatchup.getTeamHome().getStatsForGroup(season).addPoints(Rules.PROMOTION_TO_FINAL);
		} else {
			finalsMatchup.getTeamAway().getStatsForGroup(season).addPoints(Rules.PROMOTION_TO_FINAL);
		}
		// average out points per matchup
		Utils.addGamePointsForMatchup(season, finalsMatchup);

		// pass to master
		List<Team> teams = serviceUtils.loadTeams();
		for (Team team : teams) {
			team.getStatsForGroup(master).addStats(team.getStatsForGroup(season));
		}

		//save
		DataAccessObject<Season> seasonDao = new DataAccessObject<>(sessionFactory.getCurrentSession());
		seasonDao.save(season);

	}

}
