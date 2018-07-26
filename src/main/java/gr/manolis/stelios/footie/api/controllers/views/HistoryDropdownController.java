package gr.manolis.stelios.footie.api.controllers.views;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import gr.manolis.stelios.footie.api.services.ViewsService;
import gr.manolis.stelios.footie.core.peristence.dtos.groups.Season;

@Controller
@RequestMapping("/history")
public class HistoryDropdownController {

	@Autowired
	private ViewsService viewsService;

	@RequestMapping("/past_winners")
	public String league(Model model) {

		List<Season> seasons = viewsService.getAllSeasons();
		Collections.reverse(seasons);
		model.addAttribute("seasons", seasons);

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
