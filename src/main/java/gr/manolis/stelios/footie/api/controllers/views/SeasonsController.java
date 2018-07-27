package gr.manolis.stelios.footie.api.controllers.views;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import org.apache.commons.lang3.math.NumberUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import gr.manolis.stelios.footie.core.peristence.dtos.Team;
import gr.manolis.stelios.footie.core.peristence.dtos.groups.Season;
import gr.manolis.stelios.footie.core.peristence.dtos.rounds.QualsRound;
import gr.manolis.stelios.footie.core.services.SeasonService;
import gr.manolis.stelios.footie.core.services.ServiceUtils;
import gr.manolis.stelios.footie.core.tools.CoefficientsOrdering;

@Controller
@Transactional
@RequestMapping("/seasons")
public class SeasonsController {

	@Autowired
	private SeasonService seasonService;

	@Autowired
	private ServiceUtils serviceUtils;

	@RequestMapping("/{year}")
	public String seasonTotalDisplay(@PathVariable(value = "year", required = true) String year, Model model) {

		Season season = serviceUtils.loadSeason(NumberUtils.toInt(year));

		model.addAttribute("numberOfSeasons", serviceUtils.getNumberOfSeasons());
		
		// season preview
		List<Team> teams = serviceUtils.loadTeams();
		Map<Team, Integer> teamsWithCoeffs = getTeamsWithCoeffsAsMap(season, teams);
		Map<String, List<Team>> teamsInRounds = seasonService.checkWhereTeamsAreSeededForASeason(season);
		model.addAttribute("season", season);
		model.addAttribute("teamsWithCoeffs", teamsWithCoeffs);
		model.addAttribute("champion", teamsInRounds.get("champion").get(0));
		model.addAttribute("toGroups", teamsInRounds.get("toGroups"));
		model.addAttribute("toQuals1", teamsInRounds.get("toQuals1"));
		model.addAttribute("toQuals2", teamsInRounds.get("toQuals2"));

		// quals previews
		List<Map<String, Map<Team, Integer>>> qualsPreviews = new ArrayList<>();
		qualsPreviews.add(qualsPreview(season, 1, model));
		qualsPreviews.add(qualsPreview(season, 2, model));
		model.addAttribute("qualsPreviews", qualsPreviews);

		// quals rounds
		List<QualsRound> qualsRounds = new ArrayList<>();
		qualsRounds.add(serviceUtils.getQualRound(season, 1));
		qualsRounds.add(serviceUtils.getQualRound(season, 2));
		model.addAttribute("qualsRounds", qualsRounds);
		
		return "seasons/season";
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

	private Map<Team, Integer> getTeamsWithCoeffsAsMap(Season season, List<Team> teams) {
		Collections.sort(teams, new CoefficientsOrdering(season));

		Map<Team, Integer> teamsWithCoeffs = new LinkedHashMap<>();

		for (Team team : teams) {
			teamsWithCoeffs.put(team, team.getStatsForGroup(season).getPoints());
		}
		return teamsWithCoeffs;
	}

}
