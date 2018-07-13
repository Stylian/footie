package api.controllers.views;

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
import core.peristence.dtos.groups.Season;
import core.services.SeasonService;
import core.services.ServiceUtils;
import core.tools.CoefficientsOrdering;

@Controller
@RequestMapping("/seasons")
public class SeasonsController {

	@Autowired
	private ViewsService viewsService;
//	
//	@Autowired
//	private SeasonService seasonService;

	@RequestMapping("/{year}")
	public String seasonTotalDisplay(@PathVariable(value = "year", required = true) String year, Model model) {
		
		SeasonService seasonService = new SeasonService();  // FIX ME
		
		Season season = viewsService.getSeason(NumberUtils.toInt(year));
		List<Team> teams = ServiceUtils.loadTeams();

		Map<Team, Integer> teamsWithCoeffs = getTeamsWithCoeffsAsMap(season, teams);
		Map<String, List<Team>> teamsInRounds = seasonService.checkWhereTeamsAreSeededForASeason(season);
		
		model.addAttribute("season", season);
		model.addAttribute("teamsWithCoeffs", teamsWithCoeffs);
		model.addAttribute("champion", teamsInRounds.get("champion").get(0));
		model.addAttribute("toGroups", teamsInRounds.get("toGroups"));
		model.addAttribute("toQuals1", teamsInRounds.get("toQuals1"));
		model.addAttribute("toQuals2", teamsInRounds.get("toQuals2"));
		
		return "seasons/season";
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
