package api.controllers.views;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import api.services.ViewsService;

@Controller
@RequestMapping("/history")
public class HistoryDropdownController {

	@Autowired
	private ViewsService viewsService;
	
	
	@RequestMapping("/past_winners")
	public String league(Model model) {
		
		model.addAttribute("seasons", viewsService.getAllSeasons());
		
		return "history/past_winners";
	}

	@RequestMapping("/coefficients")
	public String coefficients(Model model) {

		model.addAttribute("teamsCoeffs", viewsService.getTeamsTotalCoefficients());

		return "history/coefficients";
	}

	@RequestMapping("/stats")
	public String stats(Model model) {

		model.addAttribute("teamsStats", viewsService.getTeamsTotalStats());

		return "history/stats";
	}

}
