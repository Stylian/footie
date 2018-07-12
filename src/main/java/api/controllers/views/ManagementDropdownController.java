package api.controllers.views;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import api.services.ViewsService;

@Controller
@RequestMapping("/management")
public class ManagementDropdownController {

	@Autowired
	private ViewsService viewsService;
	
	@RequestMapping("/game_stats")
	public String gameStats(Model model) {

		model.addAttribute("gameStats", viewsService.gameStats());
		return "management/game_stats";
	}
	
}
