package gr.manolis.stelios.footie.api.controllers;


import gr.manolis.stelios.footie.core.peristence.dtos.Stage;
import gr.manolis.stelios.footie.core.peristence.dtos.Team;
import gr.manolis.stelios.footie.core.peristence.dtos.groups.Season;
import gr.manolis.stelios.footie.core.peristence.dtos.rounds.QualsRound;
import gr.manolis.stelios.footie.core.services.SeasonService;
import gr.manolis.stelios.footie.core.services.ServiceUtils;
import gr.manolis.stelios.footie.core.tools.CoefficientsOrdering;
import org.apache.commons.lang3.math.NumberUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.transaction.Transactional;
import java.util.*;

@RestController
@Transactional
@RequestMapping("/rest/seasons")
public class RestSeasonController {

    final static Logger logger = Logger.getLogger(RestSeasonController.class);

    @Autowired
    private SeasonService seasonService;

    @Autowired
    private ServiceUtils serviceUtils;

    @RequestMapping("/{year}/seeding")
    public Object[] seasonSeeding(@PathVariable(value = "year", required = true) String strYear) {
        logger.info("season seeding");

        int year = NumberUtils.toInt(strYear);

        Season season = serviceUtils.loadSeason(year);
        List<Team> teams = serviceUtils.loadTeams();
        logger.info("loaded teams: " + teams);

        Map<Team, Integer> teamsWithCoeffs = getTeamsWithCoeffsAsMap(season, teams);
        logger.info("teamsWithCoeffs: " + teamsWithCoeffs);

        Map<String, List<Team>> teamsInRounds = seasonService.checkWhereTeamsAreSeededForASeason(season);
        logger.info("teamsInRounds: " + teamsInRounds);

        return new Object[]{teamsWithCoeffs, teamsInRounds};
    }

    private Map<Team, Integer> getTeamsWithCoeffsAsMap(Season season, List<Team> teams) {
        Collections.sort(teams, new CoefficientsOrdering(season));

        Map<Team, Integer> teamsWithCoeffs = new LinkedHashMap<>();

        for (Team team : teams) {
            teamsWithCoeffs.put(team, team.getStatsForGroup(season).getPoints());
        }
        return teamsWithCoeffs;
    }

    @RequestMapping("/{year}/quals1/preview")
    public Map<String, Map<Team, Integer>> quals1Preview(@PathVariable(value = "year", required = true) String strYear) {
        logger.info("quals1 preview");

        int year = NumberUtils.toInt(strYear);

        Season season = serviceUtils.loadSeason(year);
        QualsRound qr = serviceUtils.getQualRound(season, 1);

        List<Team> teamsStrong = qr.getStrongTeams();
        List<Team> teamsWeak = qr.getWeakTeams();

        //put to strong teams for pre-previews
        if(qr.getStage() == Stage.NOT_STARTED) {
            teamsStrong = qr.getTeams(); // why you empty?
        }

        Map<Team, Integer> teamsStrongWithCoeffs = getTeamsWithCoeffsAsMap(season, teamsStrong);
        Map<Team, Integer> teamsWeakWithCoeffs = getTeamsWithCoeffsAsMap(season, teamsWeak);

        Map<String, Map<Team, Integer>> qualsTeams = new HashMap<>();
        qualsTeams.put("strong", teamsStrongWithCoeffs);
        qualsTeams.put("weak", teamsWeakWithCoeffs);

        return qualsTeams;
    }
}
