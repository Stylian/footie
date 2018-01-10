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
import core.peristence.dtos.matchups.Matchup;
import core.peristence.dtos.rounds.QualsRound;
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
		
		Map<Team, Integer> teamsWithCoeffs = getTeamsWithCoeffsAsMap(season, teams);
		
		model.addAttribute("season", season);
		model.addAttribute("teamsWithCoeffs", teamsWithCoeffs);
		
		return "season_preview";
	}

  @RequestMapping("/seasons/{year}/quals/{round}/preview")
  public String quals1Preview(@PathVariable(value = "year", required = true) String year,
  		@PathVariable(value = "round", required = true) String round, Model model) {
  	
		Season season = viewsService.getSeason(NumberUtils.toInt(year));
  	QualsRound qr = viewsService.getQualRound(NumberUtils.toInt(year), NumberUtils.toInt(round));
  	
  	boolean seeded = false;
  	
  	// post seeding case for round
  	if( "2".equals(round) && qr.getStrongTeams() != null ) { 
  		
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
  	
  	Season season = viewsService.getSeason(NumberUtils.toInt(year));
  	QualsRound qr = viewsService.getQualRound(NumberUtils.toInt(year), NumberUtils.toInt(round));

  	List<Matchup> matchups = qr.getMatchups();
  	
  	model.addAttribute("matchups", matchups);
  	
  	return "quals_postview";
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
