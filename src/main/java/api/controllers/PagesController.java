package api.controllers;

import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.math.NumberUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import api.services.ViewsService;
import core.peristence.dtos.Team;
import core.peristence.dtos.groups.Group;
import core.peristence.dtos.groups.RobinGroup;
import core.peristence.dtos.groups.Season;
import core.peristence.dtos.matchups.Matchup;
import core.peristence.dtos.rounds.GroupsRound;
import core.peristence.dtos.rounds.PlayoffsRound;
import core.peristence.dtos.rounds.QualsRound;
import core.services.ServiceUtils;
import core.tools.CoefficientsOrdering;
import core.tools.RobinGroupOrdering;

@Controller
public class PagesController {

	@Autowired
	private ViewsService viewsService;

	@RequestMapping("/")
	public String landingPage(Model model) {
		return "landing_page";
	}
	
	@RequestMapping("/seasons/{year}/quals/{round}")
	public String qualsTotalDisplay(@PathVariable(value = "round", required = true) String round, Model model) {
		return "quals";
	}

	@RequestMapping("/seasons/{year}/quals/{round}/preview")
	public String quals1Preview(@PathVariable(value = "year", required = true) String year,
			@PathVariable(value = "round", required = true) String round, Model model) {

		Season season = viewsService.getSeason(NumberUtils.toInt(year));
		QualsRound qr = viewsService.getQualRound(NumberUtils.toInt(year), NumberUtils.toInt(round));

		boolean seeded = false;

		// post seeding case for round
		if ("2".equals(round) && qr.getStrongTeams() != null) {

			seeded = true;

		}

		List<Team> teams = qr.getTeams();
		List<Team> teamsStrong = qr.getStrongTeams();
		List<Team> teamsWeak = qr.getWeakTeams();

		Map<Team, Integer> teamsWithCoeffs = getTeamsWithCoeffsAsMap(season, teams);
		Map<Team, Integer> teamsStrongWithCoeffs = getTeamsWithCoeffsAsMap(season, teamsStrong);
		Map<Team, Integer> teamsWeakWithCoeffs = getTeamsWithCoeffsAsMap(season, teamsWeak);

		model.addAttribute("teamsWithCoeffs", teamsWithCoeffs);
		model.addAttribute("teamsStrongWithCoeffs", teamsStrongWithCoeffs);
		model.addAttribute("teamsWeakWithCoeffs", teamsWeakWithCoeffs);
		model.addAttribute("seeded", seeded);

		return "quals_preview";
	}

	@RequestMapping("/seasons/{year}/quals/{round}/postview")
	public String quals1Postview(@PathVariable(value = "year", required = true) String year,
			@PathVariable(value = "round", required = true) String round, Model model) {

		QualsRound qr = viewsService.getQualRound(NumberUtils.toInt(year), NumberUtils.toInt(round));

		List<Matchup> matchups = qr.getMatchups();

		model.addAttribute("matchups", matchups);

		return "quals_postview";
	}

	@RequestMapping("/seasons/{year}/groups/{round}")
	public String groupsTotalDisplay(@PathVariable(value = "round", required = true) String round, Model model) {
		return "groups";
	}
	
	// only group of 12 has a preview
	@RequestMapping("/seasons/{year}/groups/{round}/preview")
	public String groupsPreview(@PathVariable(value = "year", required = true) String year,
			@PathVariable(value = "round", required = true) String round, Model model) {

		Season season = viewsService.getSeason(NumberUtils.toInt(year));
		GroupsRound gr = viewsService.getGroupRound(NumberUtils.toInt(year), NumberUtils.toInt(round));

		boolean seeded = false;

		// post seeding case for round
		if (gr.getStrongTeams() != null) {

			seeded = true;

		}

		List<Team> teams = gr.getTeams();
		List<Team> teamsStrong = gr.getStrongTeams();
		List<Team> teamsMedium = gr.getMediumTeams();
		List<Team> teamsWeak = gr.getWeakTeams();

		Map<Team, Integer> teamsWithCoeffs = getTeamsWithCoeffsAsMap(season, teams);
		Map<Team, Integer> teamsStrongWithCoeffs = getTeamsWithCoeffsAsMap(season, teamsStrong);
		Map<Team, Integer> teamsMediumWithCoeffs = getTeamsWithCoeffsAsMap(season, teamsMedium);
		Map<Team, Integer> teamsWeakWithCoeffs = getTeamsWithCoeffsAsMap(season, teamsWeak);

		model.addAttribute("teamsWithCoeffs", teamsWithCoeffs);
		model.addAttribute("teamsStrongWithCoeffs", teamsStrongWithCoeffs);
		model.addAttribute("teamsMediumWithCoeffs", teamsMediumWithCoeffs);
		model.addAttribute("teamsWeakWithCoeffs", teamsWeakWithCoeffs);
		model.addAttribute("seeded", seeded);

		return "groups_preview";
	}

	@RequestMapping("/seasons/{year}/groups/{round}/postview")
	public String groupsPostview(@PathVariable(value = "year", required = true) String year,
			@PathVariable(value = "round", required = true) String round, Model model) {

		GroupsRound gr = viewsService.getGroupRound(NumberUtils.toInt(year), NumberUtils.toInt(round));

		model.addAttribute("groups", gr.getGroups());

		return "groups_postview";
	}

	@RequestMapping("/seasons/{year}/playoffs")
	public String playoffs(@PathVariable(value = "year", required = true) String year, Model model) {

		PlayoffsRound playoffs = viewsService.getPlayoffsRound(NumberUtils.toInt(year));

		model.addAttribute("playoffs", playoffs);

		return "playoffs";
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