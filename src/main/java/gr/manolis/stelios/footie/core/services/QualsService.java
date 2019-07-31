package gr.manolis.stelios.footie.core.services;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import javax.transaction.Transactional;

import gr.manolis.stelios.footie.core.Rules;
import gr.manolis.stelios.footie.core.peristence.dtos.groups.Group;
import gr.manolis.stelios.footie.core.tools.CoefficientsRangeOrdering;
import org.apache.log4j.Logger;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import gr.manolis.stelios.footie.core.Utils;
import gr.manolis.stelios.footie.core.peristence.DataAccessObject;
import gr.manolis.stelios.footie.core.peristence.dtos.Stage;
import gr.manolis.stelios.footie.core.peristence.dtos.Team;
import gr.manolis.stelios.footie.core.peristence.dtos.groups.Season;
import gr.manolis.stelios.footie.core.peristence.dtos.matchups.Matchup;
import gr.manolis.stelios.footie.core.peristence.dtos.matchups.MatchupFormat;
import gr.manolis.stelios.footie.core.peristence.dtos.matchups.MatchupTieStrategy;
import gr.manolis.stelios.footie.core.peristence.dtos.rounds.QualsRound;
import gr.manolis.stelios.footie.core.tools.CoefficientsOrdering;

@Service
@Transactional
public class QualsService {

	final static Logger logger = Logger.getLogger(QualsService.class);

	@Autowired
	private SessionFactory sessionFactory;

	@Autowired
	private ServiceUtils serviceUtils;

	public QualsRound seedUpQualsRound1() {
		logger.info("seed quals round 1");

		Season season = serviceUtils.loadCurrentSeason();
		QualsRound roundQuals1 = (QualsRound) season.getRounds().get(0);
		seedQualsRound(season, roundQuals1);
		
		DataAccessObject<Season> dao = new DataAccessObject<>(sessionFactory.getCurrentSession());
		dao.save(season);
		
		return roundQuals1;
	}

	public QualsRound seedUpQualsRound2() {
		logger.info("seed quals round 2");

		Season season = serviceUtils.loadCurrentSeason();

		QualsRound roundQuals1 = (QualsRound) season.getRounds().get(0);
		QualsRound roundQuals2 = (QualsRound) season.getRounds().get(1);

		// must add winners from roundQuals1
		List<Matchup> matchups = roundQuals1.getMatchups();
		List<Team> round1Winners = new ArrayList<>();

		for (Matchup matchup : matchups) {
			round1Winners.add(matchup.getWinner());
		}

		roundQuals2.getTeams().addAll(round1Winners);
		seedQualsRound(season, roundQuals2);
		
		roundQuals1.setStage(Stage.FINISHED);
		
		DataAccessObject<Season> dao = new DataAccessObject<>(sessionFactory.getCurrentSession());
		dao.save(season);
		
		return roundQuals2;
	}

	public QualsRound setUpQualsRound1() {
		logger.info("set up quals round 1");

		Season season = serviceUtils.loadCurrentSeason();
		QualsRound roundQuals1 = (QualsRound) season.getRounds().get(0);
		setUpQualsRound(roundQuals1);
		
		DataAccessObject<Season> dao = new DataAccessObject<>(sessionFactory.getCurrentSession());
		dao.save(season);
		
		return roundQuals1;
	}

	public QualsRound setUpQualsRound2() {
		logger.info("set up quals round 2");

		Season season = serviceUtils.loadCurrentSeason();
		QualsRound roundQuals2 = (QualsRound) season.getRounds().get(1);
		setUpQualsRound(roundQuals2);

		DataAccessObject<Season> dao = new DataAccessObject<>(sessionFactory.getCurrentSession());
		dao.save(season);
		
		return roundQuals2;
	}

	public void seedQualsRound(Season season, QualsRound qualsRound) {
		logger.info("seed quals round: " + qualsRound.getName());
		
		List<Team> teams = qualsRound.getTeams();
		if (season.getSeasonYear() == 1) {
			Collections.shuffle(teams);
		} else {
			if(season.getSeasonYear() > 1) {
				List<Season> seasonsPast = serviceUtils.loadAllSeasons().subList(0, season.getSeasonYear()-1);
				Collections.sort(teams, new CoefficientsRangeOrdering(seasonsPast));
			}
		}

		logger.info("quals participants: " + Utils.toString(teams));

		List<Team> strong = new ArrayList<>();
		List<Team> weak = new ArrayList<>();

		List<Team> teamsQueue = new ArrayList<>(teams);

		while (teamsQueue.size() > 0) {

			strong.add(teamsQueue.remove(0));
			weak.add(teamsQueue.remove(teamsQueue.size() - 1));

		}

		logger.info("strong: " + Utils.toString(strong));
		logger.info("weak: " + Utils.toString(weak));

		qualsRound.setStrongTeams(strong);
		qualsRound.setWeakTeams(weak);
		qualsRound.setStage(Stage.ON_PREVIEW);

	}

	public void setUpQualsRound(QualsRound qualsRound) {
		logger.info("set quals round: " + qualsRound.getName());
		
		List<Team> strong = qualsRound.getStrongTeams();
		List<Team> weak = qualsRound.getWeakTeams();

		List<Team> strongQueue = new ArrayList<>(strong);
		List<Team> weakQueue = new ArrayList<>(weak);

		Collections.shuffle(strongQueue);
		Collections.shuffle(weakQueue);

		MatchupTieStrategy tieStrategy = MatchupTieStrategy.REPLAY_GAMES;
		if (qualsRound.getNum() == 1) {
			if (qualsRound.getSeason().getSeasonYear() > 1) {
				tieStrategy = MatchupTieStrategy.HIGHEST_COEFFICIENT_WINS;
			}
		}else {
			tieStrategy = MatchupTieStrategy.REPLAY_GAMES_ONCE;
		}

		while (strongQueue.size() > 0) {

			qualsRound.addMatchup(new Matchup(strongQueue.remove(0), weakQueue.remove(0),
					MatchupFormat.FORMAT_IN_OUT_SINGLE, tieStrategy));

		}

		logger.info("matchups " + Utils.toString(qualsRound.getMatchups()));
		qualsRound.setStage(Stage.PLAYING);

	}

	public void endQualsRound(String strRound) {
		logger.info("ending quals round: " + strRound);

		int round = Integer.parseInt(strRound);

		int pointsAwarded = round < 2 ? Rules.PROMOTION_POINTS_QUALS_1 : Rules.PROMOTION_POINTS_QUALS_2;

		Season season = serviceUtils.loadCurrentSeason();

		// add coeffs to quals winners
		QualsRound roundQuals1 = (QualsRound) season.getRounds().get(round-1);
		for (Matchup matchup : roundQuals1.getMatchups()) {
			matchup.getWinner().getStatsForGroup(season).addPoints(pointsAwarded);
			Utils.addGamePointsForMatchup(season, matchup);
		}

		//save
		DataAccessObject<Season> seasonDao = new DataAccessObject<>(sessionFactory.getCurrentSession());
		seasonDao.save(season);

	}

}
