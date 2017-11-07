package main.java.service.services;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Properties;

import org.apache.log4j.Logger;
import org.hibernate.Session;

import main.java.service.PropertyUtils;
import main.java.service.Rules;
import main.java.service.Utils;
import main.java.service.peristence.DataAccessObject;
import main.java.service.peristence.HibernateUtils;
import main.java.service.peristence.dtos.Team;
import main.java.service.peristence.dtos.games.Game;
import main.java.service.peristence.dtos.games.GroupGame;
import main.java.service.peristence.dtos.groups.Group;
import main.java.service.peristence.dtos.groups.RobinGroup;
import main.java.service.peristence.dtos.groups.Season;
import main.java.service.peristence.dtos.matchups.Matchup;
import main.java.service.peristence.dtos.rounds.GroupsRound;
import main.java.service.peristence.dtos.rounds.PlayoffsRound;
import main.java.service.peristence.dtos.rounds.QualsRound;
import main.java.service.tools.CoefficientsOrdering;

public class SeasonService {

	final static Logger logger = Logger.getLogger(SeasonService.class);

	private Session session = HibernateUtils.getSession();

	public void createSeason() {

		Properties properties = PropertyUtils.load();
		String strSeasonNum = properties.getProperty("season");

		int year = Integer.parseInt(strSeasonNum) + 1;
		properties.setProperty("season", Integer.toString(year));
		properties.setProperty("round_quals_1", "0");
		properties.setProperty("round_quals_2", "0");
		properties.setProperty("groups_round_12", "0");
		properties.setProperty("groups_round_8", "0");
		properties.setProperty("quarterfinals", "0");
		properties.setProperty("semifinals", "0");
		properties.setProperty("finals", "0");
		PropertyUtils.save(properties);

		logger.info("creating season " + year);

		Season season = new Season(year);

		List<Team> teams = ServiceUtils.loadTeams();

		for (Team team : teams) {

			season.addTeam(team);

		}

		DataAccessObject<Season> dao = new DataAccessObject<>(session);
		dao.save(season);

	}

	public void setUpSeason() {

		List<Team> teams = ServiceUtils.loadTeams();

		Season season = ServiceUtils.loadCurrentSeason();

		QualsRound qualsRound1 = new QualsRound(season, "1st Qualifying Round");
		QualsRound qualsRound2 = new QualsRound(season, "2nd Qualifying Round");
		GroupsRound groupsRound12 = new GroupsRound(season, "Groups Round of 12");

		if (season.getSeasonYear() == 1) {

			// 2nd round needs 24 teams so
			int diff = teams.size() - 24;

			Collections.shuffle(teams);

			List<Team> quals1 = new ArrayList<>();
			for (int index = 0; index < 2 * diff; index++) {
				quals1.add(teams.remove(0));
			}

			logger.info("unseeded teams to 1st quals round: " + Utils.toString(quals1));
			qualsRound1.setTeams(quals1);

			logger.info("unseeded teams to 2nd quals round: " + Utils.toString(teams));
			qualsRound2.setTeams(teams);

			logger.info("1st season no teams go directly to groups");
			groupsRound12.setTeams(new ArrayList<>());

		} else {
			
			List<Team> teamsClone = new ArrayList<>(teams);
			Collections.sort(teamsClone, new CoefficientsOrdering());
			
			List<Team> groupsTeams = new ArrayList<>();
			
			// former champion promotes directly
			Team formerChampion = ServiceUtils.loadSeason(season.getSeasonYear() - 1).getWinner();
			groupsTeams.add(formerChampion);
			teamsClone.remove(formerChampion);

			// top 3 seeded teams promote directly to groups round excluding champion
			groupsTeams.add(teamsClone.remove(0));
			groupsTeams.add(teamsClone.remove(0));
			groupsTeams.add(teamsClone.remove(0));

			// 2nd round needs 16 teams so
			int diff = teamsClone.size() - 16;

			// so bottom 2*diff go to 1st quals, others directly to 2nd quals
			List<Team> quals1Teams = new ArrayList<>();
			for (int index = 0; index < 2 * diff; index++) {
				quals1Teams.add(teamsClone.remove(teamsClone.size() - 1));
			}

			logger.info("teams go directly to groups: " + Utils.toString(groupsTeams));
			groupsRound12.setTeams(groupsTeams);
			System.out.println("---------------");

			logger.info("teams go directly to 2nd quals: " + Utils.toString(teamsClone));
			qualsRound2.setTeams(teamsClone);
			System.out.println("---------------");

			logger.info("teams start from 1st quals: " + Utils.toString(quals1Teams));
			qualsRound1.setTeams(quals1Teams);

		}

		DataAccessObject<Season> seasonDao = new DataAccessObject<>(session);
		seasonDao.save(season);

	}
	
	public void endCurrentSeason() {
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
		
		for(RobinGroup robinGroup : groupsOf12Round.getGroups() ) {
			
			robinGroup.getTeamsOrdered().get(0).getStatsForGroup(season).addPoints(Rules.POINTS_GROUP12_1ST_PLACE);
			robinGroup.getTeamsOrdered().get(1).getStatsForGroup(season).addPoints(Rules.POINTS_GROUP12_2ND_PLACE);
			
			for(GroupGame groupGame : robinGroup.getGames()) {
			
				Team homeTeam = groupGame.getHomeTeam();
				if(groupGame.getResult().homeTeamWon()) {
					homeTeam.getStatsForGroup(season).addPoints(Rules.WIN_POINTS);
				}else if(groupGame.getResult().tie()) {
					homeTeam.getStatsForGroup(season).addPoints(Rules.DRAW_POINTS);
				}
				
			}
			
		}
		
		// add coeffs for groups8 positions
		GroupsRound groupsOf8Round = (GroupsRound) season.getRounds().get(3);
		
		for(RobinGroup robinGroup : groupsOf8Round.getGroups() ) {
			
			robinGroup.getTeamsOrdered().get(0).getStatsForGroup(season).addPoints(Rules.POINTS_GROUP8_1ST_PLACE);
			robinGroup.getTeamsOrdered().get(1).getStatsForGroup(season).addPoints(Rules.POINTS_GROUP8_2ND_PLACE);
			robinGroup.getTeamsOrdered().get(2).getStatsForGroup(season).addPoints(Rules.POINTS_GROUP8_3RD_PLACE);
			
			for(GroupGame groupGame : robinGroup.getGames()) {
			
				Team homeTeam = groupGame.getHomeTeam();
				if(groupGame.getResult().homeTeamWon()) {
					homeTeam.getStatsForGroup(season).addPoints(Rules.WIN_POINTS);
				}else if(groupGame.getResult().tie()) {
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
		
		if(!finalsMatchup.getTeamHome().equals(finalsMatchup.getWinner())) {
			finalsMatchup.getTeamHome().getStatsForGroup(season).addPoints(Rules.PROMOTION_TO_FINAL);
		}else {
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

			 team.getStatsForGroup(master).addStats( team.getStatsForGroup(season) );
			 
		}

		season.setWinner(finalsMatchup.getWinner());
		
		// hope it is enough, seems so
		DataAccessObject<Season> seasonDao = new DataAccessObject<>(session);
		seasonDao.save(season);

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
