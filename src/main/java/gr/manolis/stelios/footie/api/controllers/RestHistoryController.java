package gr.manolis.stelios.footie.api.controllers;


import gr.manolis.stelios.footie.api.dtos.SeasonPastWinnersDTO;
import gr.manolis.stelios.footie.api.dtos.TeamCoeffsDTO;
import gr.manolis.stelios.footie.api.dtos.TeamWithTrophiesDTO;
import gr.manolis.stelios.footie.api.mappers.SeasonPastWinnersMapper;
import gr.manolis.stelios.footie.api.mappers.TeamCoeffsMapper;
import gr.manolis.stelios.footie.api.mappers.TeamWithTrophiesMapper;
import gr.manolis.stelios.footie.api.services.ViewsService;
import gr.manolis.stelios.footie.api.tools.TeamsWithTrophiesOrdering;
import gr.manolis.stelios.footie.core.peristence.dtos.Stage;
import gr.manolis.stelios.footie.core.peristence.dtos.Stats;
import gr.manolis.stelios.footie.core.peristence.dtos.Team;
import gr.manolis.stelios.footie.core.peristence.dtos.groups.Season;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.transaction.Transactional;
import java.util.Collections;
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
    private SeasonPastWinnersMapper seasonPastWinnersMapper;

    @Autowired
    private TeamCoeffsMapper teamCoeffsMapper;

    @Autowired
    private TeamWithTrophiesMapper teamWithTrophiesMapper;

    @RequestMapping("/coefficients")
    public List<TeamCoeffsDTO>  coefficients() {
        return viewsService.getTeamsWithCoefficients();
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
    public Map<Team, Stats> stats() {
        return viewsService.getTeamsTotalStats();
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
