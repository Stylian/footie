package gr.manolis.stelios.footie.api.controllers;


import gr.manolis.stelios.footie.api.services.ViewsService;
import gr.manolis.stelios.footie.core.peristence.dtos.groups.Season;
import gr.manolis.stelios.footie.core.services.ServiceUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/rest/admin")
public class RestAdminController {

    @Autowired
    private ViewsService viewsService;

    @Autowired
    private ServiceUtils serviceUtils;

    @RequestMapping("/game_stats")
    public Map<String, Object> gameStats() {
        return viewsService.gameStats();
    }


    @RequestMapping("/stages")
    public Season gameStages() {
        return serviceUtils.loadCurrentSeason();
    }

}