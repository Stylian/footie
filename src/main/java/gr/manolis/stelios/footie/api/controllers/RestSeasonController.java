package gr.manolis.stelios.footie.api.controllers;


import gr.manolis.stelios.footie.api.services.ViewsService;
import gr.manolis.stelios.footie.core.peristence.dtos.League;
import gr.manolis.stelios.footie.core.peristence.dtos.Stage;
import gr.manolis.stelios.footie.core.peristence.dtos.Team;
import gr.manolis.stelios.footie.core.peristence.dtos.games.Game;
import gr.manolis.stelios.footie.core.peristence.dtos.groups.RobinGroup;
import gr.manolis.stelios.footie.core.peristence.dtos.groups.Season;
import gr.manolis.stelios.footie.core.peristence.dtos.rounds.GroupsRound;
import gr.manolis.stelios.footie.core.peristence.dtos.rounds.PlayoffsRound;
import gr.manolis.stelios.footie.core.peristence.dtos.rounds.QualsRound;
import gr.manolis.stelios.footie.core.peristence.dtos.rounds.Round;
import gr.manolis.stelios.footie.core.services.GameService;
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
@RequestMapping("/rest")
public class RestSeasonController {

    final static Logger logger = Logger.getLogger(RestSeasonController.class);

    @Autowired
    private SeasonService seasonService;

    @Autowired
    private ViewsService viewsService;

    @Autowired
    private ServiceUtils serviceUtils;

    @Autowired
    private GameService gameService;

    @Autowired
    private RestOperationsController restOperationsController;

    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------

    // jack of all trades
    @RequestMapping("next_game")
    public Game getNextGameAndMoveStages() {
        logger.info("getNextGame");

        League league = (League) (restOperationsController.getOrCreateLeague().getBody()); // runs only the very first time
        if (league.getSeasonNum() < 1) {
            return new Game();
        }

        Game game = gameService.getNextGame();

        // no more games so move to next stage
        if (game == null) {
            Map<String, String> rounds = seasonStatus("" + serviceUtils.loadCurrentSeason().getSeasonYear());
            for (Map.Entry<String, String> round : rounds.entrySet()) {
                if ("PLAYING".equals(round.getValue())) {

                    switch (round.getKey()) {
                        case "quals1":
                            restOperationsController.seedQualsRound("2");
                            break;
                        case "quals2":
                            restOperationsController.seedGroupsRoundOf12();
                            break;
                        case "groups1":
                            restOperationsController.seedAndSetGroupsRoundOf8();
                            break;
                        case "groups2":
                            restOperationsController.seedAndSetQuarterfinals();
                            break;
                        case "playoffs":
                            Season season = serviceUtils.loadCurrentSeason();
                            PlayoffsRound playoffsRound = (PlayoffsRound) season.getRounds().get(4);
                            if(playoffsRound.getQuarterMatchups().get(0).getWinner() == null
                                || playoffsRound.getQuarterMatchups().get(1).getWinner() == null ) {
                                break;
                            }
                            if (playoffsRound.getSemisMatchups() == null) {
                                restOperationsController.seedAndSetSemifinals();
                            } else {
                                if(playoffsRound.getSemisMatchups().get(0).getWinner() == null
                                        || playoffsRound.getSemisMatchups().get(1).getWinner() == null ) {
                                    break;
                                }

                                if (playoffsRound.getFinalsMatchup() == null) {
                                    restOperationsController.seedAndSetFinals();
                                }else {
                                    if(playoffsRound.getFinalsMatchup().getWinner() != null) {
                                        restOperationsController.endSeason();
                                    }
                                }
                            }
                            break;
                    }
                }

            }

        }

        return game == null ? new Game() : game; // new game has id of 0
    }

    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------
    @RequestMapping("seasons/{year}/status")
    public Map<String, String> seasonStatus(@PathVariable(value = "year", required = true) String strYear) {
        logger.info("season seeding");

        int year = NumberUtils.toInt(strYear);

        Season season = serviceUtils.loadSeason(year);
        Map<String, String> roundStages = new LinkedHashMap<>();

        roundStages.put("season", season.getStage().name());

        // set default values
        roundStages.put("quals1", "NOT_STARTED");
        roundStages.put("quals2", "NOT_STARTED");
        roundStages.put("groups1", "NOT_STARTED");
        roundStages.put("groups2", "NOT_STARTED");
        roundStages.put("playoffs", "NOT_STARTED");

        if (season.getStage() == Stage.NOT_STARTED || season.getStage() == Stage.ON_PREVIEW) {
            return roundStages; // early return
        }

        // replaces default values
        for (Round round : season.getRounds()) {
            roundStages.put(round.getName(), round.getStage().name());
        }

        return roundStages;
    }

    @RequestMapping("seasons/{year}/seeding")
    public Object[] seasonSeeding(@PathVariable(value = "year", required = true) String strYear) {
        logger.info("season seeding");

        int year = NumberUtils.toInt(strYear);

        Season season = serviceUtils.loadSeason(year);
        List<Team> teams = serviceUtils.loadTeams();
        logger.info("loaded teams: " + teams);

        Map<Team, Integer> teamsWithCoeffs = getTeamsWithCoeffsAsMap(season, teams);
        logger.info("teamsWithCoeffs: " + teamsWithCoeffs);

        Map<String, List<Team>> teamsInRounds = null;
        if (season.getSeasonYear() != 1) {
            teamsInRounds = seasonService.checkWhereTeamsAreSeededForASeason(season);
        } else { // just for viewing
            teamsInRounds = new HashMap<>();
            teamsInRounds.put("toQuals1", teams);
            teamsInRounds.put("toQuals2", Collections.emptyList());
            teamsInRounds.put("toGroups", Collections.emptyList());
            teamsInRounds.put("champion", Collections.emptyList());
        }
        logger.info("teamsInRounds: " + teamsInRounds);

        return new Object[]{teamsWithCoeffs, teamsInRounds};
    }

    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------
    @RequestMapping("seasons/{year}/quals/{round}/seeding")
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
        if (qr.getStage() == Stage.NOT_STARTED) {
            teamsStrong = qr.getTeams(); // why you empty?
        }

        Map<Team, Integer> teamsStrongWithCoeffs = getTeamsWithCoeffsAsMap(season, teamsStrong);
        Map<Team, Integer> teamsWeakWithCoeffs = getTeamsWithCoeffsAsMap(season, teamsWeak);

        Map<String, Map<Team, Integer>> qualsTeams = new HashMap<>();
        qualsTeams.put("strong", teamsStrongWithCoeffs);
        qualsTeams.put("weak", teamsWeakWithCoeffs);

        return qualsTeams;
    }

    @RequestMapping("seasons/{year}/quals/{round}/matches")
    public Map<Integer, List<Game>> qualsMatches(
            @PathVariable(value = "year", required = true) String strYear,
            @PathVariable(value = "round", required = true) String strRound) {
        logger.info("quals matches");

        int year = NumberUtils.toInt(strYear);
        int round = NumberUtils.toInt(strRound);

        Season season = serviceUtils.loadSeason(year);
        QualsRound qr = serviceUtils.getQualRound(season, round);

        // need to split main games to day 1 and 2 for viewing
        Map<Integer, List<Game>> days = qr.getGamesPerDay();
        List<Game> mainGames = days.get(1);
        List<Game> replayGames = days.get(-1);

        Map<Integer, List<Game>> newDaysStructure = new HashMap<>();
        if (replayGames != null) {
            newDaysStructure.put(-1, replayGames);
        }
        newDaysStructure.put(1, mainGames.subList(0, mainGames.size() / 2));
        newDaysStructure.put(2, mainGames.subList(mainGames.size() / 2, mainGames.size()));

        return newDaysStructure;
    }


    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------
    @RequestMapping("seasons/{year}/groups/{round}/seeding")
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
        if (qr.getStage() == Stage.NOT_STARTED) {
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

    @RequestMapping("seasons/{year}/groups/{round}/matches")
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

    @RequestMapping("seasons/{year}/groups/{round}")
    public List<RobinGroup> groupsRound(
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

    @RequestMapping("/seasons/{year}/playoffs/structure")
    public Map<String, String> getPlayoffsRoundStructure(@PathVariable String year) {

        PlayoffsRound round = viewsService.getPlayoffsRound(NumberUtils.toInt(year));
        Map<String, String> structure = new HashMap<>();
        structure.put("gA1", round.getgA1().getName());
        structure.put("gA2", round.getgA2().getName());
        structure.put("gA3", round.getgA3().getName());
        structure.put("gB1", round.getgB1().getName());
        structure.put("gB2", round.getgB2().getName());
        structure.put("gB3", round.getgB3().getName());

        // TODO
        //semis
        Team s1 = round.getQuarterMatchups().get(1).getWinner();
        if (s1 == null) {
            structure.put("S1", "");
        } else {
            structure.put("S1", s1.getName());
        }

        Team s2 = round.getQuarterMatchups().get(0).getWinner();
        if (s2 == null) {
            structure.put("S2", "");
        } else {
            structure.put("S2", s2.getName());
        }

        //finals
        structure.put("F1", "");
        structure.put("F2", "");
//        structure.put("F1", round.getgA1().getName());
//        structure.put("F2", round.getgB3().getName());

        return structure;
    }

    @RequestMapping("/seasons/{year}/playoffs/matches")
    public Map<String, List<Game>> getPlayoffsRoundMatches(@PathVariable String year) {

        PlayoffsRound round = viewsService.getPlayoffsRound(NumberUtils.toInt(year));
        Map<String, List<Game>> matches = new HashMap<>();

        List<Game> quarters = new ArrayList<>();
        round.getQuarterMatchups().forEach(m -> quarters.addAll(m.getGames()));
        matches.put("quarters", quarters);

        List<Game> semis = new ArrayList<>();
        round.getSemisMatchups().forEach(m -> semis.addAll(m.getGames()));
        semis.sort( (g1, g2) -> {
            if(g1.getDay() < 0) return 10;
            else if (g2.getDay() < 0) return -1;
            else return g1.getDay() - g2.getDay();
        });
        matches.put("semis", semis);

        List<Game> finals = new ArrayList<>();
        if (round.getFinalsMatchup() != null) {
            finals.addAll(round.getFinalsMatchup().getGames());
        }
        matches.put("finals", finals);

        return matches;
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
