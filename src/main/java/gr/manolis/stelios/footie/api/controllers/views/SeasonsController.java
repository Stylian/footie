package gr.manolis.stelios.footie.api.controllers.views;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import org.apache.commons.lang3.math.NumberUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import gr.manolis.stelios.footie.core.peristence.dtos.League;
import gr.manolis.stelios.footie.core.peristence.dtos.Stage;
import gr.manolis.stelios.footie.core.peristence.dtos.Team;
import gr.manolis.stelios.footie.core.peristence.dtos.games.Game;
import gr.manolis.stelios.footie.core.peristence.dtos.groups.RobinGroup;
import gr.manolis.stelios.footie.core.peristence.dtos.groups.Season;
import gr.manolis.stelios.footie.core.peristence.dtos.rounds.GroupsRound;
import gr.manolis.stelios.footie.core.peristence.dtos.rounds.QualsRound;
import gr.manolis.stelios.footie.core.peristence.dtos.rounds.Round;
import gr.manolis.stelios.footie.core.services.SeasonService;
import gr.manolis.stelios.footie.core.services.ServiceUtils;
import gr.manolis.stelios.footie.core.tools.CoefficientsOrdering;

@Controller
@Transactional
@RequestMapping("/seasons")
public class SeasonsController {

	final static Logger logger = Logger.getLogger(SeasonsController.class);
	
	@Autowired
	private SeasonService seasonService;

	@Autowired
	private ServiceUtils serviceUtils;

	@RequestMapping("/{year}")
	public String seasonTotalDisplay(@PathVariable(value = "year", required = true) String strYear, Model model) {
		logger.info("season total display starting");
		
		int year = NumberUtils.toInt(strYear);
		
		Season season = serviceUtils.loadSeason(year);
		logger.info("loaded season: " + season);

		model.addAttribute("season", season);
		model.addAttribute("numberOfSeasons", serviceUtils.getNumberOfSeasons());
		
		getSeasonPreviewToModel(model, year, season);

		
		getQualsPreviewsToModel(model, season);
//		getQualsRoundsToModel(model, season);
//		getGroupsPreviewsToModel(model, season);
//		getGroupsRoundsToModel(model, season);
		
		return "season/season";
	}

	private void getSeasonPreviewToModel(Model model, int year, Season season) {
		List<Team> teams = serviceUtils.loadTeams();
		logger.info("loaded teams: " + teams);

		Map<Team, Integer> teamsWithCoeffs = getTeamsWithCoeffsAsMap(season, teams);
		logger.info("teamsWithCoeffs: " + teamsWithCoeffs);
		
		Map<String, List<Team>> teamsInRounds = seasonService.checkWhereTeamsAreSeededForASeason(season);
		logger.info("teamsInRounds: " + teamsInRounds);
		
		model.addAttribute("teamsWithCoeffs", teamsWithCoeffs);
		
		if(year == 1) {
			// no reason to display for preview, all displayed from 2nd season onwards only
			model.addAttribute("champion", Collections.<Team> emptyList());
			model.addAttribute("toGroups", Collections.<Team> emptyList());
			model.addAttribute("toQuals1", Collections.<Team> emptyList());
			model.addAttribute("toQuals2", Collections.<Team> emptyList());		
		}else {
			model.addAttribute("champion", teamsInRounds.get("champion").get(0));
			model.addAttribute("toGroups", teamsInRounds.get("toGroups"));
			model.addAttribute("toQuals1", teamsInRounds.get("toQuals1"));
			model.addAttribute("toQuals2", teamsInRounds.get("toQuals2"));			
		}
	}

	private void getGroupsRoundsToModel(Model model, Season season) {
		List<GroupsRound> groupsRounds = new ArrayList<>();
		groupsRounds.add(serviceUtils.getGroupsRound(season, 1));
		groupsRounds.add(serviceUtils.getGroupsRound(season, 2));
		logger.info("groupsRounds: " + groupsRounds);
		model.addAttribute("groupsRounds", groupsRounds);
	}

	private void getGroupsPreviewsToModel(Model model, Season season) {
		List<Map<String, Map<Team, Integer>>> groupsPreviews = new ArrayList<>();
		groupsPreviews.add(groupsPreview(season, 1, model));
		groupsPreviews.add(groupsPreview(season, 2, model));
		logger.info("groupsPreviews: " + groupsPreviews);
		model.addAttribute("groupsPreviews", groupsPreviews);
	}

	private void getQualsRoundsToModel(Model model, Season season) {
		List<QualsRound> qualsRounds = new ArrayList<>();
		qualsRounds.add(serviceUtils.getQualRound(season, 1));
		qualsRounds.add(serviceUtils.getQualRound(season, 2));
		logger.info("qualsRounds: " + qualsRounds);
		logger.info("qualsRounds games: " + qualsRounds.get(0).getGamesPerDay());
		model.addAttribute("qualsRounds", qualsRounds);
	}

	private void getQualsPreviewsToModel(Model model, Season season) {
		List<Map<String, Map<Team, Integer>>> qualsPreviews = new ArrayList<>();
		qualsPreviews.add(qualsPreview(season, 1, model));
		qualsPreviews.add(qualsPreview(season, 2, model));
		logger.info("qualsPreviews: " + qualsPreviews);
		model.addAttribute("qualsPreviews", qualsPreviews);
	}

	private Map<String, Map<Team, Integer>> qualsPreview(Season season, int round, Model model) {

		QualsRound qr = serviceUtils.getQualRound(season, round);

		// boolean seeded = false;
		//
		// // post seeding case for round
		// if ("2".equals(round) && qr.getStrongTeams() != null) {
		//
		// seeded = true;
		//
		// }

		List<Team> teamsStrong = qr.getStrongTeams();
		List<Team> teamsWeak = qr.getWeakTeams();

		Map<Team, Integer> teamsStrongWithCoeffs = getTeamsWithCoeffsAsMap(season, teamsStrong);
		Map<Team, Integer> teamsWeakWithCoeffs = getTeamsWithCoeffsAsMap(season, teamsWeak);

		Map<String, Map<Team, Integer>> qualsTeams = new HashMap<>();
		qualsTeams.put("strong", teamsStrongWithCoeffs);
		qualsTeams.put("weak", teamsWeakWithCoeffs);

		return qualsTeams;
	}
	
	private Map<String, Map<Team, Integer>> groupsPreview(Season season, int round, Model model) {
		
		GroupsRound qr = serviceUtils.getGroupsRound(season, round);
		
		// boolean seeded = false;
		//
		// // post seeding case for round
		// if ("2".equals(round) && qr.getStrongTeams() != null) {
		//
		// seeded = true;
		//
		// }
		
		List<Team> teamsStrong = qr.getStrongTeams();
		List<Team> teamsMedium = qr.getMediumTeams();
		List<Team> teamsWeak = qr.getWeakTeams();
		
		Map<Team, Integer> teamsStrongWithCoeffs = getTeamsWithCoeffsAsMap(season, teamsStrong);
		Map<Team, Integer> teamsMediumWithCoeffs = getTeamsWithCoeffsAsMap(season, teamsMedium);
		Map<Team, Integer> teamsWeakWithCoeffs = getTeamsWithCoeffsAsMap(season, teamsWeak);
		
		Map<String, Map<Team, Integer>> groupsTeams = new HashMap<>();
		groupsTeams.put("strong", teamsStrongWithCoeffs);
		groupsTeams.put("medium", teamsMediumWithCoeffs);
		groupsTeams.put("weak", teamsWeakWithCoeffs);
		
		return groupsTeams;
	}

	private Map<Team, Integer> getTeamsWithCoeffsAsMap(Season season, List<Team> teams) {
		Collections.sort(teams, new CoefficientsOrdering(season));

		Map<Team, Integer> teamsWithCoeffs = new LinkedHashMap<>();

		for (Team team : teams) {
			teamsWithCoeffs.put(team, team.getStatsForGroup(season).getPoints());
		}
		return teamsWithCoeffs;
	}

}
