package gr.manolis.stelios.footie.api.controllers;


import gr.manolis.stelios.footie.core.peristence.dtos.Stage;
import gr.manolis.stelios.footie.core.peristence.dtos.Team;
import gr.manolis.stelios.footie.core.peristence.dtos.games.Game;
import gr.manolis.stelios.footie.core.peristence.dtos.groups.RobinGroup;
import gr.manolis.stelios.footie.core.peristence.dtos.groups.Season;
import gr.manolis.stelios.footie.core.peristence.dtos.matchups.Matchup;
import gr.manolis.stelios.footie.core.peristence.dtos.rounds.GroupsRound;
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

    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------
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


    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------
    @RequestMapping("/{year}/quals/{round}/seeding")
    public Map<String, Map<Team, Integer>> qualsSeeding(
            @PathVariable(value = "year", required = true) String strYear,
            @PathVariable(value = "round", required = true) String strRound) {
        logger.info("quals seeding");

        int year = NumberUtils.toInt(strYear);
        int round = NumberUtils.toInt(strRound);

        Season season = serviceUtils.loadSeason(year);
        QualsRound qr = serviceUtils.getQualRound(season, round);

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

    @RequestMapping("/{year}/quals/{round}/matches/{day}")
    public List<Game> qualsMatches(
            @PathVariable(value = "year", required = true) String strYear,
            @PathVariable(value = "round", required = true) String strRound,
            @PathVariable(value = "day", required = true) String strDay) {
        logger.info("quals matches");

        int year = NumberUtils.toInt(strYear);
        int round = NumberUtils.toInt(strRound);
        int day = NumberUtils.toInt(strDay);

        Season season = serviceUtils.loadSeason(year);
        QualsRound qr = serviceUtils.getQualRound(season, round);

        return qr.getGamesPerDay().get(day);
    }


    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------
    @RequestMapping("/{year}/groups/{round}/seeding")
    public Map<String, Map<Team, Integer>> groups1Seeding(
            @PathVariable(value = "year", required = true) String strYear,
            @PathVariable(value = "round", required = true) String strRound) {
        logger.info("groups seeding");

        int year = NumberUtils.toInt(strYear);
        int round = NumberUtils.toInt(strRound);

        Season season = serviceUtils.loadSeason(year);
        GroupsRound qr = serviceUtils.getGroupsRound(season, round);

        List<Team> teamsStrong = qr.getStrongTeams();
        List<Team> teamsMedium = qr.getMediumTeams();
        List<Team> teamsWeak = qr.getWeakTeams();

        //put to strong teams for pre-previews
        if(qr.getStage() == Stage.NOT_STARTED) {
            teamsStrong = qr.getTeams();
        }


        Map<Team, Integer> teamsStrongWithCoeffs = getTeamsWithCoeffsAsMap(season, teamsStrong);
        Map<Team, Integer> teamsMediumWithCoeffs = getTeamsWithCoeffsAsMap(season, teamsMedium);
        Map<Team, Integer> teamsWeakWithCoeffs = getTeamsWithCoeffsAsMap(season, teamsWeak);

        Map<String, Map<Team, Integer>> groupsTeams = new HashMap<>();
        groupsTeams.put("strong", teamsStrongWithCoeffs);
        groupsTeams.put("medium", teamsMediumWithCoeffs);
        groupsTeams.put("weak", teamsWeakWithCoeffs);

        return groupsTeams;
    }

    @RequestMapping("/{year}/groups/{round}/matches")
    public Map<Integer, List<Game>> groupsMatches(
            @PathVariable(value = "year", required = true) String strYear,
            @PathVariable(value = "round", required = true) String strRound) {
        logger.info("groups matches");

        int year = NumberUtils.toInt(strYear);
        int round = NumberUtils.toInt(strRound);

        Season season = serviceUtils.loadSeason(year);
        GroupsRound groupsRound = serviceUtils.getGroupsRound(season, round);

        logger.info("groupsRounds: " + groupsRound);

        return groupsRound.getGamesPerDay();
    }

    @RequestMapping("/{year}/groups/{round}")
    public  List<RobinGroup> groupsRound(
            @PathVariable(value = "year", required = true) String strYear,
            @PathVariable(value = "round", required = true) String strRound) {
        logger.info("groups round");

        int year = NumberUtils.toInt(strYear);
        int round = NumberUtils.toInt(strRound);

        Season season = serviceUtils.loadSeason(year);
        GroupsRound groupsRound = serviceUtils.getGroupsRound(season, round);

        logger.info("groupsRounds: " + groupsRound);

        return groupsRound.getGroups();
    }

    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------
    private Map<Team, Integer> getTeamsWithCoeffsAsMap(Season season, List<Team> teams) {
        Collections.sort(teams, new CoefficientsOrdering(season));

        Map<Team, Integer> teamsWithCoeffs = new LinkedHashMap<>();

        for (Team team : teams) {
            teamsWithCoeffs.put(team, team.getStatsForGroup(season).getPoints());
        }
        return teamsWithCoeffs;
    }
}
