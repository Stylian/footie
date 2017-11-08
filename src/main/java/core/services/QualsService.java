package core.services;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.Session;

import core.Utils;
import core.peristence.DataAccessObject;
import core.peristence.HibernateUtils;
import core.peristence.dtos.League;
import core.peristence.dtos.LeagueStage;
import core.peristence.dtos.Team;
import core.peristence.dtos.groups.Season;
import core.peristence.dtos.matchups.Matchup;
import core.peristence.dtos.matchups.MatchupFormat;
import core.peristence.dtos.matchups.MatchupTieStrategy;
import core.peristence.dtos.rounds.QualsRound;
import core.tools.CoefficientsOrdering;

public class QualsService {

	final static Logger logger = Logger.getLogger(QualsService.class);

	private Session session = HibernateUtils.getSession();
	
	public void seedUpQualsRound1() {
		logger.info("seed quals round 1");
		
		Season season = ServiceUtils.loadCurrentSeason();

		QualsRound roundQuals1 = (QualsRound) season.getRounds().get(0);
		
		seedQualsRound(season, roundQuals1);
		
		League league = ServiceUtils.getLeague();
		league.setQuals1(LeagueStage.ON_PREVIEW);
		league.save();
		
	}

	public void seedUpQualsRound2() {
		logger.info("seed quals round 2");
		
		Season season = ServiceUtils.loadCurrentSeason();
		
		QualsRound roundQuals1 = (QualsRound) season.getRounds().get(0);
		QualsRound roundQuals2 = (QualsRound) season.getRounds().get(1);
		
		// must add winners from roundQuals1
		List<Matchup> matchups = roundQuals1.getMatchups();
		
		List<Team> round1Winners = new ArrayList<>();
		
		for(Matchup matchup : matchups) {
			
			round1Winners.add(matchup.getWinner());
			
		}
		
		roundQuals2.getTeams().addAll(round1Winners);
		
		seedQualsRound(season, roundQuals2);
		
		League league = ServiceUtils.getLeague();
		league.setQuals2(LeagueStage.ON_PREVIEW);
		league.save();
		
	}
	
	public void setUpQualsRound1() {
		logger.info("set up quals round 1");
		
		Season season = ServiceUtils.loadCurrentSeason();
		
		QualsRound roundQuals1 = (QualsRound) season.getRounds().get(0);
		
		setUpQualsRound(roundQuals1);
		
		League league = ServiceUtils.getLeague();
		league.setQuals1(LeagueStage.PLAYING);
		league.save();
		
	}
	
	
	public void setUpQualsRound2() {
		logger.info("set up quals round 2");
		
		Season season = ServiceUtils.loadCurrentSeason();
		
		QualsRound roundQuals2 = (QualsRound) season.getRounds().get(1);
		
		setUpQualsRound(roundQuals2);
		
		League league = ServiceUtils.getLeague();
		league.setQuals2(LeagueStage.PLAYING);
		league.save();
		
	}
	
	public void seedQualsRound(Season season, QualsRound qualsRound) {

		List<Team> teams = qualsRound.getTeams();
		
		if(season.getSeasonYear() == 1) {
			
			Collections.shuffle(teams);
			
		}else {
		
			Collections.sort(teams, new CoefficientsOrdering());
		
		}
		
		logger.info("quals participants: " + Utils.toString(teams));
		
		List<Team> strong = new ArrayList<>();
		List<Team> weak = new ArrayList<>();
		
		List<Team> teamsQueue = new ArrayList<>(teams);
		
		while(teamsQueue.size() > 0) {
			
			strong.add(teamsQueue.remove(0));
			weak.add(teamsQueue.remove(teamsQueue.size() - 1));
			
		}
		
		logger.info("strong: " + Utils.toString(strong));
		logger.info("weak: " + Utils.toString(weak));

		qualsRound.setStrongTeams(strong);
		qualsRound.setWeakTeams(weak);
		
		DataAccessObject<QualsRound> roundDao = new DataAccessObject<>(session);
		roundDao.save(qualsRound);
		
	}
	
	public void setUpQualsRound(QualsRound qualsRound) {
	
		List<Team> strong = qualsRound.getStrongTeams();
		List<Team> weak = qualsRound.getWeakTeams();
		
		List<Team> strongQueue = new ArrayList<>(strong);
		List<Team> weakQueue = new ArrayList<>(weak);
		
		Collections.shuffle(strongQueue);
		Collections.shuffle(weakQueue);
		
		while(strongQueue.size() > 0) {
			
			qualsRound.addMatchup(new Matchup(
					strongQueue.remove(0),
					weakQueue.remove(0),
					MatchupFormat.FORMAT_IN_OUT_SINGLE,
					MatchupTieStrategy.REPLAY_GAMES
				));
			
		}
		
		logger.info("matchups " + Utils.toString(qualsRound.getMatchups()));
		
		DataAccessObject<QualsRound> roundDao = new DataAccessObject<>(session);
		roundDao.save(qualsRound);
		
	}
	
}
