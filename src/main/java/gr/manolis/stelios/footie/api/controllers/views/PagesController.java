package gr.manolis.stelios.footie.api.controllers.views;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.view.RedirectView;

import gr.manolis.stelios.footie.core.services.ServiceUtils;

@Controller
public class PagesController {

	@Autowired
	private ServiceUtils serviceUtils;
	
	@RequestMapping("/")
	public RedirectView landingPage(Model model) {
		
		RedirectView rv = new RedirectView();
        rv.setContextRelative(true);
        rv.setUrl("/seasons/" + serviceUtils.getNumberOfSeasons());
        return rv;
	}


//	@RequestMapping("/seasons/{year}/groups/{round}")
//	public String groupsTotalDisplay(@PathVariable(value = "round", required = true) String round, Model model) {
//		return "groups";
//	}
//
//	// only group of 12 has a preview
//	@RequestMapping("/seasons/{year}/groups/{round}/preview")
//	public String groupsPreview(@PathVariable(value = "year", required = true) String year,
//			@PathVariable(value = "round", required = true) String round, Model model) {
//
//		Season season = viewsService.getSeason(NumberUtils.toInt(year));
//		GroupsRound gr = viewsService.getGroupRound(NumberUtils.toInt(year), NumberUtils.toInt(round));
//
//		boolean seeded = false;
//
//		// post seeding case for round
//		if (gr.getStrongTeams() != null) {
//
//			seeded = true;
//
//		}
//
//		List<Team> teams = gr.getTeams();
//		List<Team> teamsStrong = gr.getStrongTeams();
//		List<Team> teamsMedium = gr.getMediumTeams();
//		List<Team> teamsWeak = gr.getWeakTeams();
//
//		Map<Team, Integer> teamsWithCoeffs = getTeamsWithCoeffsAsMap(season, teams);
//		Map<Team, Integer> teamsStrongWithCoeffs = getTeamsWithCoeffsAsMap(season, teamsStrong);
//		Map<Team, Integer> teamsMediumWithCoeffs = getTeamsWithCoeffsAsMap(season, teamsMedium);
//		Map<Team, Integer> teamsWeakWithCoeffs = getTeamsWithCoeffsAsMap(season, teamsWeak);
//
//		model.addAttribute("teamsWithCoeffs", teamsWithCoeffs);
//		model.addAttribute("teamsStrongWithCoeffs", teamsStrongWithCoeffs);
//		model.addAttribute("teamsMediumWithCoeffs", teamsMediumWithCoeffs);
//		model.addAttribute("teamsWeakWithCoeffs", teamsWeakWithCoeffs);
//		model.addAttribute("seeded", seeded);
//
//		return "groups_preview";
//	}
//
//	@RequestMapping("/seasons/{year}/groups/{round}/postview")
//	public String groupsPostview(@PathVariable(value = "year", required = true) String year,
//			@PathVariable(value = "round", required = true) String round, Model model) {
//
//		GroupsRound gr = viewsService.getGroupRound(NumberUtils.toInt(year), NumberUtils.toInt(round));
//
//		model.addAttribute("groups", gr.getGroups());
//
//		return "groups_postview";
//	}
//
//	@RequestMapping("/seasons/{year}/playoffs")
//	public String playoffs(@PathVariable(value = "year", required = true) String year, Model model) {
//
//		PlayoffsRound playoffs = viewsService.getPlayoffsRound(NumberUtils.toInt(year));
//
//		model.addAttribute("playoffs", playoffs);
//
//		return "playoffs";
//	}
//
//	private Map<Team, Integer> getTeamsWithCoeffsAsMap(Season season, List<Team> teams) {
//		Collections.sort(teams, new CoefficientsOrdering(season));
//
//		Map<Team, Integer> teamsWithCoeffs = new LinkedHashMap<>();
//
//		for (Team team : teams) {
//			teamsWithCoeffs.put(team, team.getStatsForGroup(season).getPoints());
//		}
//		return teamsWithCoeffs;
//	}

}