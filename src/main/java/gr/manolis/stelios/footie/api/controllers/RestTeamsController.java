package gr.manolis.stelios.footie.api.controllers;


import gr.manolis.stelios.footie.api.dtos.TeamSimpleDTO;
import gr.manolis.stelios.footie.api.mappers.TeamSimpleMapper;
import gr.manolis.stelios.footie.api.services.ViewsService;
import gr.manolis.stelios.footie.core.peristence.dtos.Team;
import org.apache.commons.lang3.math.NumberUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.transaction.Transactional;
import java.util.List;

@RestController
@Transactional
@RequestMapping("/rest/teams")
public class RestTeamsController {

    final static Logger logger = Logger.getLogger(RestTeamsController.class);

    @Autowired
    private ViewsService viewsService;

    @Autowired
    TeamSimpleMapper teamSimpleMapper;

    @RequestMapping("/{team_id}")
    public TeamSimpleDTO getTeamData(@PathVariable(value = "team_id", required = true) String strTeamId) {
        logger.info("getTeamData");

        int teamId = NumberUtils.toInt(strTeamId);

        List<Team> teams = viewsService.getTeams();
        Team team = teams.stream().filter ( t -> t.getId() == teamId).findFirst().get();

        TeamSimpleDTO dto = teamSimpleMapper.toDTO(team);

        return dto;
    }

}
