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
import core.peristence.dtos.Stats;
import core.peristence.dtos.Team;
import core.peristence.dtos.groups.Season;
import core.services.ServiceUtils;
import core.tools.CoefficientsOrdering;

@Controller
public class PagesController {

	@Autowired
	private ViewsService viewsService;

	@RequestMapping("past_winners")
	public String league(Model model) {

		model.addAttribute("seasons", viewsService.getAllSeasons());

		return "past_winners";
	}
	
	@RequestMapping("coefficients")
	public String coefficients(Model model) {
		
		model.addAttribute("teamsCoeffs", viewsService.getTeamsTotalCoefficients());
		
		return "coefficients";
	}
	
	@RequestMapping("stats")
	public String stats(Model model) {
		
		model.addAttribute("teamsStats", viewsService.getTeamsTotalStats());
		
		return "stats";
	}
	
	@RequestMapping("seasons/{year}/preview")
	public String seasonPreview(@PathVariable(value = "year", required = true) String year, Model model) {
		
		Season season = viewsService.getSeason(NumberUtils.toInt(year));
		List<Team> teams = ServiceUtils.loadTeams();
		
		Collections.sort(teams, new CoefficientsOrdering(season));
		
		Map<Team, Integer> pastCoeffs = new LinkedHashMap<>();
		
		for (Team team : teams) {
			pastCoeffs.put(team, team.getStatsForGroup(season).getPoints());
		}
		
		model.addAttribute("season", season);
		model.addAttribute("pastCoeffs", pastCoeffs);
		
		return "season_preview";
	}

}
