package gr.manolis.stelios.footie.api.controllers.views;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import gr.manolis.stelios.footie.api.services.ViewsService;
import gr.manolis.stelios.footie.core.peristence.dtos.groups.Season;
import gr.manolis.stelios.footie.core.services.ServiceUtils;

@Controller
@RequestMapping("/management")
public class ManagementDropdownController {

	@Autowired
	private ViewsService viewsService;

	@Autowired
	private ServiceUtils serviceUtils;
	
	@RequestMapping("/game_stats")
	public String gameStats(Model model) {

		model.addAttribute("gameStats", viewsService.gameStats());
		return "management/game_stats";
	}
	
	@RequestMapping("/stages")
	public String gameStages(Model model) {
		
		Season season = serviceUtils.loadCurrentSeason();
		
		model.addAttribute("season", season);
		return "management/stages";
	}

}
