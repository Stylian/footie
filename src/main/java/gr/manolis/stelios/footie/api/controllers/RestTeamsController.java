package gr.manolis.stelios.footie.api.controllers;


import gr.manolis.stelios.footie.api.dtos.PlayerDTO;
import gr.manolis.stelios.footie.api.dtos.TeamPageDTO;
import gr.manolis.stelios.footie.api.dtos.TeamSimpleDTO;
import gr.manolis.stelios.footie.api.mappers.TeamPageMapper;
import gr.manolis.stelios.footie.api.mappers.TeamSimpleMapper;
import gr.manolis.stelios.footie.api.services.ViewsService;
import gr.manolis.stelios.footie.api.tools.PlayersWithTrophiesOrdering;
import gr.manolis.stelios.footie.core.peristence.dtos.Stats;
import gr.manolis.stelios.footie.core.peristence.dtos.Team;
import gr.manolis.stelios.footie.core.services.ServiceUtils;
import org.apache.commons.lang3.math.NumberUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@RestController
@Transactional
@RequestMapping("/rest/teams")
public class RestTeamsController {

    final static Logger logger = Logger.getLogger(RestTeamsController.class);

    @Autowired
    private ServiceUtils serviceUtils;

    @Autowired
    private TeamPageMapper teamPageMapper;

    @Autowired
    private TeamSimpleMapper teamSimpleMapper;

    @GetMapping("/")
    public List<TeamSimpleDTO> getTeams() {
        List<Team> teams = serviceUtils.loadTeams();
        List<TeamSimpleDTO> teamSimpleDTOS = teamSimpleMapper.toDTO(teams);
        Collections.sort(teamSimpleDTOS, Comparator.comparing(TeamSimpleDTO::getName));
        return teamSimpleDTOS;
    }

    @RequestMapping("/{team_id}")
    public TeamPageDTO getTeamData(@PathVariable(value = "team_id", required = true) String strTeamId) {
        logger.info("getTeamData");

        int teamId = NumberUtils.toInt(strTeamId);

        Team team = serviceUtils.loadTeam(teamId);

        TeamPageDTO dto = teamPageMapper.toDTO(team);

        dto.getPlayers().sort(new PlayersWithTrophiesOrdering());

        List<Stats> seasonsStats = new ArrayList<>();
        serviceUtils.loadAllSeasons().forEach( (s) -> seasonsStats.add(team.getStatsForGroup(s)));
        dto.setSeasonsStats(seasonsStats);

        Stats completeStats = new Stats();
        seasonsStats.forEach( (stat) -> completeStats.addStats(stat));
        dto.setCompleteStats(completeStats);

        return dto;
    }

}
