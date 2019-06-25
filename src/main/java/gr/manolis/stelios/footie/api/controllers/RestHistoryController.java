package gr.manolis.stelios.footie.api.controllers;


import gr.manolis.stelios.footie.api.services.ViewsService;
import gr.manolis.stelios.footie.core.peristence.dtos.Stats;
import gr.manolis.stelios.footie.core.peristence.dtos.Team;
import gr.manolis.stelios.footie.core.peristence.dtos.groups.Season;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/rest/history")
public class RestHistoryController {

    @Autowired
    private ViewsService viewsService;

    @RequestMapping("/coefficients")
    public Map<Team, Integer> coefficients() {
        return viewsService.getTeamsTotalCoefficients();
    }

    @RequestMapping("/stats")
    public Map<Team, Stats> stats() {
        return viewsService.getTeamsTotalStats();
    }

    @RequestMapping("/past_winners")
    public List<Season>  pastWinners() {
        List<Season> seasons = viewsService.getAllSeasons();
        Collections.reverse(seasons);
        return seasons;
    }

}
