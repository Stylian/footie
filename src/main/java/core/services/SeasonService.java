package core.services;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import org.apache.log4j.Logger;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import core.Rules;
import core.Utils;
import core.peristence.DataAccessObject;
import core.peristence.dtos.League;
import core.peristence.dtos.Stats;
import core.peristence.dtos.Team;
import core.peristence.dtos.games.Game;
import core.peristence.dtos.games.GroupGame;
import core.peristence.dtos.groups.Group;
import core.peristence.dtos.groups.RobinGroup;
import core.peristence.dtos.groups.Season;
import core.peristence.dtos.matchups.Matchup;
import core.peristence.dtos.rounds.GroupsRound;
import core.peristence.dtos.rounds.PlayoffsRound;
import core.peristence.dtos.rounds.QualsRound;
import core.tools.CoefficientsOrdering;

@Service
@Transactional
public class SeasonService {

	final static Logger logger = Logger.getLogger(SeasonService.class);

	@Autowired
	private SessionFactory sessionFactory;
	
	@Autowired
	private ServiceUtils ServiceUtils;

	public Season createSeason() {

		League league = ServiceUtils.getLeague();
		league.resetStages();
		league.addSeason();
		DataAccessObject<League> dao2 = new DataAccessObject<>(sessionFactory.getCurrentSession());
		dao2.save(league);

		logger.info("creating season " + league.getSeasonNum());

		Season season = new Season(league.getSeasonNum());

		List<Team> teams = ServiceUtils.loadTeams();

		for (Team team : teams) {

			season.addTeam(team);

		}

		DataAccessObject<Season> dao = new DataAccessObject<>(sessionFactory.getCurrentSession());
		dao.save(season);

		return season;

	}

	public Season setUpSeason() {

		Season season = ServiceUtils.loadCurrentSeason();

		QualsRound qualsRound1 = new QualsRound(season, "1st Qualifying Round");
		QualsRound qualsRound2 = new QualsRound(season, "2nd Qualifying Round");
		GroupsRound groupsRound12 = new GroupsRound(season, "Groups Round of 12");

		Map<String, List<Team>> teamsSeeded = checkWhereTeamsAreSeededForASeason(season);

		List<Team> groupsTeams = teamsSeeded.get("toGroups");
		logger.info("teams go directly to groups: " + Utils.toString(groupsTeams));
		groupsRound12.setTeams(groupsTeams);
		System.out.println("---------------");

		List<Team> quals2Teams = teamsSeeded.get("toQuals2");
		logger.info("teams go directly to 2nd quals: " + Utils.toString(quals2Teams));
		qualsRound2.setTeams(quals2Teams);
		System.out.println("---------------");

		List<Team> quals1Teams = teamsSeeded.get("toQuals1");
		logger.info("teams start from 1st quals: " + Utils.toString(quals1Teams));
		qualsRound1.setTeams(quals1Teams);

		DataAccessObject<Season> seasonDao = new DataAccessObject<>(sessionFactory.getCurrentSession());
		seasonDao.save(season);

		return season;

	}

	/**
	 * returns a map with lists of teams seeded per phase
	 */
	public Map<String, List<Team>> checkWhereTeamsAreSeededForASeason(Season season) {

		List<Team> teams = ServiceUtils.loadTeams();
		
		Map<String, List<Team>> map = new HashMap<>();

		List<Team> teamsClone = new ArrayList<>(teams);
		Collections.sort(teamsClone, new CoefficientsOrdering(season));

		List<Team> groupsTeams = new ArrayList<>();
		Team formerChampion = null;
		List<Team> quals1Teams = new ArrayList<>();

		if (season.getSeasonYear() == 1) {
			
			// 2nd round needs 24 teams so
			int diff = teamsClone.size() - 24;

			Collections.shuffle(teamsClone);

			for (int index = 0; index < 2 * diff; index++) {
				quals1Teams.add(teamsClone.remove(0));
			}
			
			logger.info("1st season no teams go directly to groups");
			
		}else {
			
			// former champion promotes directly
			formerChampion = ServiceUtils.loadSeason(season.getSeasonYear() - 1).getWinner();
			groupsTeams.add(formerChampion);
			teamsClone.remove(formerChampion);
	
			// top 3 seeded teams promote directly to groups round excluding champion
			groupsTeams.add(teamsClone.remove(0));
			groupsTeams.add(teamsClone.remove(0));
			groupsTeams.add(teamsClone.remove(0));
	
			// 2nd round needs 16 teams so
			int diff = teamsClone.size() - 16; // cannot support more than 36 teams, probably no less than 22 as well
	
			// so bottom 2*diff go to 1st quals, others directly to 2nd quals
			for (int index = 0; index < 2 * diff; index++) {
				quals1Teams.add(teamsClone.remove(teamsClone.size() - 1));
			}

		}
		
		map.put("champion", Arrays.asList(formerChampion));
		map.put("toGroups", groupsTeams);
		map.put("toQuals1", quals1Teams);
		map.put("toQuals2", teamsClone);

		return map;
	}

	public Season endCurrentSeason() {
		logger.info("closing down season, calculating coefficients");
		// maybe set up winner later

		Season season = ServiceUtils.loadCurrentSeason();

		// add coeffs to quals1 winners
		QualsRound roundQuals1 = (QualsRound) season.getRounds().get(0);

		for (Matchup matchup : roundQuals1.getMatchups()) {

			matchup.getWinner().getStatsForGroup(season).addPoints(Rules.PROMOTION_POINTS_QUALS_1);

			// average out points per matchup
			addGamePointsForMatchup(season, matchup);

		}

		// add coeffs to quals2 winners
		QualsRound roundQuals2 = (QualsRound) season.getRounds().get(1);

		for (Matchup matchup : roundQuals2.getMatchups()) {

			matchup.getWinner().getStatsForGroup(season).addPoints(Rules.PROMOTION_POINTS_QUALS_2);

			// average out points per matchup
			addGamePointsForMatchup(season, matchup);

		}

		// add coeffs for groups12 positions
		GroupsRound groupsOf12Round = (GroupsRound) season.getRounds().get(2);

		for (RobinGroup robinGroup : groupsOf12Round.getGroups()) {

			robinGroup.getTeamsOrdered().get(0).getStatsForGroup(season).addPoints(Rules.POINTS_GROUP12_1ST_PLACE);
			robinGroup.getTeamsOrdered().get(1).getStatsForGroup(season).addPoints(Rules.POINTS_GROUP12_2ND_PLACE);

			for (GroupGame groupGame : robinGroup.getGames()) {

				Team homeTeam = groupGame.getHomeTeam();
				if (groupGame.getResult().homeTeamWon()) {
					homeTeam.getStatsForGroup(season).addPoints(Rules.WIN_POINTS);
				} else if (groupGame.getResult().tie()) {
					homeTeam.getStatsForGroup(season).addPoints(Rules.DRAW_POINTS);
				}

			}

		}

		// add coeffs for groups8 positions
		GroupsRound groupsOf8Round = (GroupsRound) season.getRounds().get(3);

		for (RobinGroup robinGroup : groupsOf8Round.getGroups()) {

			robinGroup.getTeamsOrdered().get(0).getStatsForGroup(season).addPoints(Rules.POINTS_GROUP8_1ST_PLACE);
			robinGroup.getTeamsOrdered().get(1).getStatsForGroup(season).addPoints(Rules.POINTS_GROUP8_2ND_PLACE);
			robinGroup.getTeamsOrdered().get(2).getStatsForGroup(season).addPoints(Rules.POINTS_GROUP8_3RD_PLACE);

			for (GroupGame groupGame : robinGroup.getGames()) {

				Team homeTeam = groupGame.getHomeTeam();
				if (groupGame.getResult().homeTeamWon()) {
					homeTeam.getStatsForGroup(season).addPoints(Rules.WIN_POINTS);
				} else if (groupGame.getResult().tie()) {
					homeTeam.getStatsForGroup(season).addPoints(Rules.DRAW_POINTS);
				}

			}

		}

		// add coeffs to playoffs
		PlayoffsRound playoffsRound = (PlayoffsRound) season.getRounds().get(4);

		for (Matchup matchup : playoffsRound.getQuarterMatchups()) {

			// average out points per matchup
			addGamePointsForMatchup(season, matchup);

		}

		for (Matchup matchup : playoffsRound.getSemisMatchups()) {

			// average out points per matchup
			addGamePointsForMatchup(season, matchup);

		}

		Matchup finalsMatchup = playoffsRound.getFinalsMatchup();

		finalsMatchup.getWinner().getStatsForGroup(season).addPoints(Rules.POINTS_WINNING_THE_LEAGUE);

		if (!finalsMatchup.getTeamHome().equals(finalsMatchup.getWinner())) {
			finalsMatchup.getTeamHome().getStatsForGroup(season).addPoints(Rules.PROMOTION_TO_FINAL);
		} else {
			finalsMatchup.getTeamAway().getStatsForGroup(season).addPoints(Rules.PROMOTION_TO_FINAL);
		}

		// average out points per matchup
		addGamePointsForMatchup(season, finalsMatchup);

		// add points for goals scored
		List<Team> teams = ServiceUtils.loadTeams();

		for (Team team : teams) {

			int goalsScored = team.getStatsForGroup(season).getGoalsScored();
			team.getStatsForGroup(season).addPoints(goalsScored * Rules.GOALS_POINTS);

		}

		// add season stats to master group
		Group master = ServiceUtils.getMasterGroup();

		for (Team team : teams) {

			Stats pastStats = new Stats(team.getStatsForGroup(master));

			team.getStatsForGroup(master).addStats(team.getStatsForGroup(season));

			team.setStatsForGroup(season, pastStats);

		}

		season.setWinner(finalsMatchup.getWinner());

		// hope it is enough, seems so
		DataAccessObject<Season> seasonDao = new DataAccessObject<>(sessionFactory.getCurrentSession());
		seasonDao.save(season);

		return season;

	}

	private void addGamePointsForMatchup(Season season, Matchup matchup) {
		int matchPointsHome = 0;
		int matchPointsAway = 0;
		int numberOfGames = 0;

		for (Game game : matchup.getGames()) {

			numberOfGames++;

			if (game.getResult().homeTeamWon()) {

				if (game.getHomeTeam().equals(matchup.getTeamHome())) {
					matchPointsHome += Rules.WIN_POINTS;
				} else {
					matchPointsAway += Rules.WIN_POINTS;
				}

			} else if (game.getResult().tie()) {

				if (game.getHomeTeam().equals(matchup.getTeamHome())) {
					matchPointsHome += Rules.DRAW_POINTS;
				} else {
					matchPointsAway += Rules.DRAW_POINTS;
				}

			}

		}

		matchup.getTeamHome().getStatsForGroup(season).addPoints(2 * matchPointsHome / numberOfGames);
		matchup.getTeamAway().getStatsForGroup(season).addPoints(2 * matchPointsAway / numberOfGames);
	}

}
