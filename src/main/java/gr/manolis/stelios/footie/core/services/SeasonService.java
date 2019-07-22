package gr.manolis.stelios.footie.core.services;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import gr.manolis.stelios.footie.core.peristence.dtos.*;
import gr.manolis.stelios.footie.core.tools.CoefficientsRangeOrdering;
import org.apache.log4j.Logger;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import gr.manolis.stelios.footie.core.Rules;
import gr.manolis.stelios.footie.core.Utils;
import gr.manolis.stelios.footie.core.peristence.DataAccessObject;
import gr.manolis.stelios.footie.core.peristence.dtos.games.Game;
import gr.manolis.stelios.footie.core.peristence.dtos.games.GroupGame;
import gr.manolis.stelios.footie.core.peristence.dtos.groups.Group;
import gr.manolis.stelios.footie.core.peristence.dtos.groups.RobinGroup;
import gr.manolis.stelios.footie.core.peristence.dtos.groups.Season;
import gr.manolis.stelios.footie.core.peristence.dtos.matchups.Matchup;
import gr.manolis.stelios.footie.core.peristence.dtos.rounds.GroupsRound;
import gr.manolis.stelios.footie.core.peristence.dtos.rounds.PlayoffsRound;
import gr.manolis.stelios.footie.core.peristence.dtos.rounds.QualsRound;
import gr.manolis.stelios.footie.core.tools.CoefficientsOrdering;

@Service
@Transactional
public class SeasonService {

	final static Logger logger = Logger.getLogger(SeasonService.class);

	@Autowired
	private SessionFactory sessionFactory;

	@Autowired
	private ServiceUtils serviceUtils;

	public Season createSeason() {
		logger.info("creating season");

		League league = serviceUtils.getLeague();
		league.addSeason();
		DataAccessObject<League> dao2 = new DataAccessObject<>(sessionFactory.getCurrentSession());
		dao2.save(league);

		logger.info("creating season " + league.getSeasonNum());

		Season season = new Season(league.getSeasonNum());
		season.setStage(Stage.NOT_STARTED);
		
		List<Team> teams = serviceUtils.loadTeams();

		for (Team team : teams) {

			season.addTeam(team);

		}

		DataAccessObject<Season> dao = new DataAccessObject<>(sessionFactory.getCurrentSession());
		dao.save(season);

		return season;

	}

	public Season setUpSeason() {
		logger.info("setting up season");
		
		Season season = serviceUtils.loadCurrentSeason();

		if(season.getStage() == Stage.PLAYING || season.getStage() == Stage.FINISHED) {
			return season;
		}

		QualsRound qualsRound1 = new QualsRound(season, "quals1", 1);
		QualsRound qualsRound2 = new QualsRound(season, "quals2", 2);
		GroupsRound groupsRound12 = new GroupsRound(season, "groups1", 3);

		Map<Seed, List<Team>> teamsSeeded = checkWhereTeamsAreSeededForASeason(season);

		List<Team> groupsTeams = teamsSeeded.get(Seed.TO_GROUPS);
		logger.info("teams go directly to groups: " + Utils.toString(groupsTeams));
		groupsRound12.setTeams(groupsTeams);
		System.out.println("---------------");

		List<Team> quals2Teams = teamsSeeded.get(Seed.TO_QUALS_2);
		logger.info("teams go directly to 2nd quals: " + Utils.toString(quals2Teams));
		qualsRound2.setTeams(quals2Teams);
		System.out.println("---------------");

		List<Team> quals1Teams = teamsSeeded.get(Seed.TO_QUALS_1);
		logger.info("teams start from 1st quals: " + Utils.toString(quals1Teams));
		qualsRound1.setTeams(quals1Teams);

		season.setStage(Stage.PLAYING);
		
		DataAccessObject<Season> seasonDao = new DataAccessObject<>(sessionFactory.getCurrentSession());
		seasonDao.save(season);

		return season;

	}

	/**
	 * returns a map with lists of teams seeded per phase
	 */
	public Map<Seed, List<Team>> checkWhereTeamsAreSeededForASeason(Season season) {

		List<Team> teams = serviceUtils.loadTeams();

		Map<Seed, List<Team>> map = new HashMap<>();

		List<Team> teamsClone = new ArrayList<>(teams);

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

		} else {

			Season previousSeason =  serviceUtils.loadSeason(season.getSeasonYear() - 1);

			if(season.getSeasonYear() > 1) {
				List<Season> seasonsPast = serviceUtils.loadAllSeasons().subList(0, season.getSeasonYear()-1);
				Collections.sort(teamsClone, new CoefficientsRangeOrdering(seasonsPast));
			}

			// former champion promotes directly
			formerChampion = previousSeason.getWinner();
			groupsTeams.add(formerChampion);
			teamsClone.remove(formerChampion);

			// top 1 seeded team promotes directly to groups round excluding champion
			groupsTeams.add(teamsClone.remove(0));

			//former runner up should go to quals2 if not in groups already by moving it to top
			Team formerRunnerUp = previousSeason.getRunnerUp();
			if(!groupsTeams.contains(formerRunnerUp)) {
				int itemPos = teamsClone.indexOf(formerRunnerUp);
				teamsClone.remove(itemPos);
				teamsClone.add(0, formerRunnerUp);
			}

			// 2nd round needs 20 teams so
			int diff = teamsClone.size() - 20;

			// so bottom 2*diff go to 1st quals, others directly to 2nd quals
			for (int index = 0; index < 2 * diff; index++) {
				quals1Teams.add(teamsClone.remove(teamsClone.size() - 1));
			}

		}

		map.put(Seed.CHAMPION, formerChampion == null ? Collections.emptyList() : Arrays.asList(formerChampion));
		map.put(Seed.TO_GROUPS, groupsTeams);
		map.put(Seed.TO_QUALS_1, quals1Teams);
		map.put(Seed.TO_QUALS_2, teamsClone);

		return map;
	}

	public Season endCurrentSeason() {
		logger.info("closing down season, calculating coefficients");

		Season season = serviceUtils.loadCurrentSeason();
		PlayoffsRound playoffsRound = (PlayoffsRound) season.getRounds().get(4);
		Matchup finalsMatchup = playoffsRound.getFinalsMatchup();

		Team winner = finalsMatchup.getWinner();
		Team runnerUp = finalsMatchup.getWinner().equals(finalsMatchup.getTeamHome()) ?
				finalsMatchup.getTeamAway() : finalsMatchup.getTeamHome();

		winner.addTrophy(new Trophy(season.getSeasonYear(), Trophy.WINNER));
		runnerUp.addTrophy(new Trophy(season.getSeasonYear(), Trophy.RUNNER_UP));

		season.setWinner(winner);
		season.setRunnerUp(runnerUp);
		season.getRounds().get(4).setStage(Stage.FINISHED);
		season.setStage(Stage.FINISHED);

		DataAccessObject<Season> seasonDao = new DataAccessObject<>(sessionFactory.getCurrentSession());
		seasonDao.save(season);

		return season;

	}

}
