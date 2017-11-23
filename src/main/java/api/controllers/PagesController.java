package api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import api.services.OperationsService;
import api.services.ViewsService;

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

//	@RequestMapping("/greeting")
//	public String greeting(@RequestParam(value = "name", required = false, defaultValue = "World") String name,
//			Model model) {
//		model.addAttribute("name", name);
//		return "greeting";
//	}

}
