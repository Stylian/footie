package gr.manolis.stelios.footie.api.controllers;


import gr.manolis.stelios.footie.api.dtos.SeasonPastWinnersDTO;
import gr.manolis.stelios.footie.api.dtos.TeamCoeffsDTO;
import gr.manolis.stelios.footie.api.dtos.TeamSimpleDTO;
import gr.manolis.stelios.footie.api.dtos.TeamWithTrophiesDTO;
import gr.manolis.stelios.footie.api.mappers.SeasonPastWinnersMapper;
import gr.manolis.stelios.footie.api.mappers.TeamCoeffsMapper;
import gr.manolis.stelios.footie.api.mappers.TeamSimpleMapper;
import gr.manolis.stelios.footie.api.mappers.TeamWithTrophiesMapper;
import gr.manolis.stelios.footie.api.services.ViewsService;
import gr.manolis.stelios.footie.api.tools.TeamsWithTrophiesOrdering;
import gr.manolis.stelios.footie.core.peristence.dtos.Stage;
import gr.manolis.stelios.footie.core.peristence.dtos.Stats;
import gr.manolis.stelios.footie.core.peristence.dtos.Team;
import gr.manolis.stelios.footie.core.peristence.dtos.groups.Season;
import gr.manolis.stelios.footie.core.services.ServiceUtils;
import org.apache.commons.lang3.math.NumberUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.transaction.Transactional;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@Transactional
@RequestMapping("/rest/history")
public class RestHistoryController {

    @Autowired
    private ViewsService viewsService;

    @Autowired
    private ServiceUtils serviceUtils;

    @Autowired
    private SeasonPastWinnersMapper seasonPastWinnersMapper;

    @Autowired
    private TeamWithTrophiesMapper teamWithTrophiesMapper;

    @Autowired
    private TeamSimpleMapper teamSimpleMapper;

    @RequestMapping("/coefficients")
    public List<TeamCoeffsDTO>  coefficients() {
        return viewsService.getTeamsWithCoefficients();
    }

    @RequestMapping("/statistics")
    public Map<String, Object>  statistics() {
        return viewsService.gameStats();
    }

    @RequestMapping("/statistics/teams/{team_id}")
    public Map<String, Object>  statisticsPerTeam(
            @PathVariable(value = "team_id", required = true) String strTeamId) {

        int teamId = NumberUtils.toInt(strTeamId);
        Team team = serviceUtils.loadTeam(teamId);
        return viewsService.gameStats(teamId, team.getStatsForGroup(serviceUtils.loadCurrentSeason()).getElo());
    }

    @RequestMapping("/teams/trophies")
    public List<TeamWithTrophiesDTO>  teamsWithTrophies() {

        List<Team> teams = viewsService.getTeams();
        List<TeamWithTrophiesDTO> teamsWithTrophiesDTO = teamWithTrophiesMapper.toDTO(teams);

        teamsWithTrophiesDTO = teamsWithTrophiesDTO.stream()
                .filter( (t) -> t.getGold() > 0 || t.getSilver() > 0)
                .collect(Collectors.toList());

        teamsWithTrophiesDTO.sort(new TeamsWithTrophiesOrdering());
        return teamsWithTrophiesDTO;
    }

    @RequestMapping("/stats")
    public Map<String, Map<String, Object>> stats() {
        Map<Team, Map<String, Object>> teams = viewsService.getTeamsTotalStats();
        Map<String, Map<String, Object>> teamsDTO = new LinkedHashMap<>();

        for(Map.Entry<Team, Map<String, Object>> entry : teams.entrySet()) {
            entry.getValue().put("teamObject", teamSimpleMapper.toDTO(entry.getKey()));
            teamsDTO.put(
                    entry.getKey().getName(),
                    entry.getValue()
            );
        }

        return teamsDTO;
    }

    @RequestMapping("/past_winners")
    public List<SeasonPastWinnersDTO>  pastWinners() {
        List<Season> seasons = viewsService.getAllSeasons();
        Collections.reverse(seasons);
        List<Season> finishedSeasons = seasons.stream()
                .filter( (s) -> s.getStage() == Stage.FINISHED).collect(Collectors.toList());
        return seasonPastWinnersMapper.toDTO(finishedSeasons);
    }

}
