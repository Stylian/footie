package gr.manolis.stelios.footie.api.controllers;


import gr.manolis.stelios.footie.api.services.ViewsService;
import gr.manolis.stelios.footie.core.peristence.dtos.Stats;
import gr.manolis.stelios.footie.core.peristence.dtos.Team;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
