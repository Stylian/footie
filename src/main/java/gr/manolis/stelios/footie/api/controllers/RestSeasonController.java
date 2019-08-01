package gr.manolis.stelios.footie.api.controllers;


import gr.manolis.stelios.footie.api.dtos.*;
import gr.manolis.stelios.footie.api.mappers.MatchupGameMapper;
import gr.manolis.stelios.footie.api.mappers.RobinGroupMapper;
import gr.manolis.stelios.footie.api.mappers.TeamCoeffsMapper;
import gr.manolis.stelios.footie.api.mappers.TeamSimpleMapper;
import gr.manolis.stelios.footie.api.services.ViewsService;
import gr.manolis.stelios.footie.core.peristence.dtos.*;
import gr.manolis.stelios.footie.core.peristence.dtos.games.Game;
import gr.manolis.stelios.footie.core.peristence.dtos.groups.RobinGroup;
import gr.manolis.stelios.footie.core.peristence.dtos.groups.Season;
import gr.manolis.stelios.footie.core.peristence.dtos.rounds.GroupsRound;
import gr.manolis.stelios.footie.core.peristence.dtos.rounds.PlayoffsRound;
import gr.manolis.stelios.footie.core.peristence.dtos.rounds.QualsRound;
import gr.manolis.stelios.footie.core.peristence.dtos.rounds.Round;
import gr.manolis.stelios.footie.core.services.*;
import gr.manolis.stelios.footie.core.tools.CoefficientsOrdering;
import gr.manolis.stelios.footie.core.tools.CoefficientsRangeOrdering;
import org.apache.commons.lang3.math.NumberUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.CollectionUtils;
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
    private QualsService qualsService;

    @Autowired
    private GroupsRoundService groupsRoundService;

    @Autowired
    private PlayoffsRoundService playoffsRoundService;

    @Autowired
    private ViewsService viewsService;

    @Autowired
    private ServiceUtils serviceUtils;

    @Autowired
    private GameService gameService;


    @Autowired
    private RestOperationsController restOperationsController;

    @Autowired
    private TeamSimpleMapper teamSimpleMapper;

    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------

    @Autowired
    private TeamCoeffsMapper teamCoeffsMapper;

    @Autowired
    private RobinGroupMapper robinGroupMapper;

    @Autowired
    private MatchupGameMapper matchupGameMapper;

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
                            qualsService.endQualsRound("1");
                            restOperationsController.seedQualsRound("2");
                            break;
                        case "quals2":
                            qualsService.endQualsRound("2");
                            restOperationsController.seedGroupsRoundOf12();
                            break;
                        case "groups1":
                            groupsRoundService.endGroupsRound("1");
                            restOperationsController.seedAndSetGroupsRoundOf8();
                            break;
                        case "groups2":
                            groupsRoundService.endGroupsRound("2");
                            restOperationsController.seedAndSetQuarterfinals();
                            break;
                        case "playoffs":
                            Season season = serviceUtils.loadCurrentSeason();
                            PlayoffsRound playoffsRound = (PlayoffsRound) season.getRounds().get(4);
                            if(playoffsRound.getQuarterMatchups().get(0).getWinner() == null
                                    || playoffsRound.getQuarterMatchups().get(1).getWinner() == null ) {
                                break;
                            }
                            if (CollectionUtils.isEmpty(playoffsRound.getSemisMatchups())) {
                                playoffsRoundService.endPlayoffsQuarters();
                                restOperationsController.seedAndSetSemifinals();
                            } else {
                                if(playoffsRound.getSemisMatchups().get(0).getWinner() == null
                                        || playoffsRound.getSemisMatchups().get(1).getWinner() == null ) {
                                    break;
                                }

                                if (playoffsRound.getFinalsMatchup() == null) {
                                    playoffsRoundService.endPlayoffsSemis();
                                    restOperationsController.seedAndSetFinals();
                                }else {
                                    if(playoffsRound.getFinalsMatchup().getWinner() != null) {
                                        playoffsRoundService.endPlayoffsFinals();
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

    @RequestMapping("seasons")
    public int seasonYear() {
        return serviceUtils.getLeague().getSeasonNum();
    }

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
    public List<TeamCoeffsDTO>  seasonSeeding(@PathVariable(value = "year", required = true) String strYear) {
        logger.info("season seeding");

        int year = NumberUtils.toInt(strYear);

        Season season = serviceUtils.loadSeason(year);
        List<Team> teams = serviceUtils.loadTeams();
        logger.info("loaded teams: " + teams);

        Map<Seed, List<Team>> teamsInRounds = null;
        if (season.getSeasonYear() != 1) {
            teamsInRounds = seasonService.checkWhereTeamsAreSeededForASeason(season);
        } else { // just for viewing
            teamsInRounds = new HashMap<>();
            teamsInRounds.put(Seed.TO_QUALS_1, teams);
            teamsInRounds.put(Seed.TO_QUALS_2, Collections.emptyList());
            teamsInRounds.put(Seed.TO_GROUPS, Collections.emptyList());
            teamsInRounds.put(Seed.CHAMPION, Collections.emptyList());
        }
        logger.info("teamsInRounds: " + teamsInRounds);

        List<TeamCoeffsDTO> theTeams = getTeamsWithCoeffsAndSeed(season, teams, teamsInRounds);
        logger.info("theTeams: " + theTeams);

        return theTeams;
    }

    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------
    @RequestMapping("seasons/{year}/quals/{round}/seeding")
    public Map<Seed, List<TeamCoeffsDTO>> qualsSeeding(
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
            teamsStrong = qr.getTeams();
        }

        List<TeamCoeffsDTO> teamsStrongWithCoeffs = getTeamsWithCoeffsAndSeed(season, teamsStrong, Seed.STRONG);
        List<TeamCoeffsDTO> teamsWeakWithCoeffs = getTeamsWithCoeffsAndSeed(season, teamsWeak, Seed.WEAK);

        Map<Seed, List<TeamCoeffsDTO>>  qualsTeams = new HashMap<>();
        qualsTeams.put(Seed.STRONG, teamsStrongWithCoeffs);
        qualsTeams.put(Seed.WEAK, teamsWeakWithCoeffs);

        return qualsTeams;
    }

    @RequestMapping("seasons/{year}/quals/{round}/matches")
    public Map<Integer, List<MatchupGameDTO>> qualsMatches(
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

        // mapping
        Map<Integer, List<MatchupGameDTO>> newDaysStructureMapped = new HashMap<>();
        for(Map.Entry<Integer, List<Game>> entry : newDaysStructure.entrySet()) {
            newDaysStructureMapped.put(entry.getKey(), matchupGameMapper.toDTO(entry.getValue()));
        }

        return newDaysStructureMapped;
    }


    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------
    @RequestMapping("seasons/{year}/groups/{round}/seeding")
    public Map<Seed, List<TeamCoeffsDTO>> groups1Seeding(
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

        List<TeamCoeffsDTO> teamsStrongWithCoeffs = getTeamsWithCoeffsAndSeed(season, teamsStrong, Seed.STRONG);
        List<TeamCoeffsDTO> teamsMediumWithCoeffs = getTeamsWithCoeffsAndSeed(season, teamsMedium, Seed.MEDIUM);
        List<TeamCoeffsDTO> teamsWeakWithCoeffs = getTeamsWithCoeffsAndSeed(season, teamsWeak, Seed.WEAK);

        Map<Seed, List<TeamCoeffsDTO>> groupsTeams = new HashMap<>();
        groupsTeams.put(Seed.STRONG, teamsStrongWithCoeffs);
        groupsTeams.put(Seed.MEDIUM, teamsMediumWithCoeffs);
        groupsTeams.put(Seed.WEAK, teamsWeakWithCoeffs);

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
    public List<RobinGroupDTO> groupsRound(
            @PathVariable(value = "year", required = true) String strYear,
            @PathVariable(value = "round", required = true) String strRound) {
        logger.info("groups round");

        int year = NumberUtils.toInt(strYear);
        int round = NumberUtils.toInt(strRound);

        Season season = serviceUtils.loadSeason(year);
        GroupsRound groupsRound = serviceUtils.getGroupsRound(season, round);

        logger.info("groupsRounds: " + groupsRound);

        List<RobinGroup> groups = groupsRound.getGroups();
        List<RobinGroupDTO> groupsDTO = robinGroupMapper.toDTO(groups);

        return groupsDTO;
    }

    @RequestMapping("/seasons/{year}/playoffs/structure")
    public Map<String, TeamSimpleDTO> getPlayoffsRoundStructure(@PathVariable String year) {

        PlayoffsRound round = viewsService.getPlayoffsRound(NumberUtils.toInt(year));
        Map<String, TeamSimpleDTO> structure = new HashMap<>();
        structure.put("gA1", teamSimpleMapper.toDTO(round.getgA1()));
        structure.put("gA2", teamSimpleMapper.toDTO(round.getgA2()));
        structure.put("gA3", teamSimpleMapper.toDTO(round.getgA3()));
        structure.put("gB1", teamSimpleMapper.toDTO(round.getgB1()));
        structure.put("gB2", teamSimpleMapper.toDTO(round.getgB2()));
        structure.put("gB3", teamSimpleMapper.toDTO(round.getgB3()));

        boolean quartersDone = false;

        TeamSimpleDTO emptyTeam = new TeamSimpleDTO();
        emptyTeam.setId(-1);
        emptyTeam.setName("");

        //semis
        Team s1 = round.getQuarterMatchups().get(1).getWinner();
        if (s1 == null) {
            structure.put("S1", emptyTeam);
        } else {
            quartersDone = true;
            structure.put("S1", teamSimpleMapper.toDTO(s1));
        }

        Team s2 = round.getQuarterMatchups().get(0).getWinner();
        if (s2 == null) {
            structure.put("S2", emptyTeam);
        } else {
            structure.put("S2", teamSimpleMapper.toDTO(s2));
        }

        //finals
        if (!quartersDone) {
            structure.put("F1", emptyTeam);
            structure.put("F2", emptyTeam);
        }else {
            Team f1 = round.getSemisMatchups().get(0).getWinner();
            if(f1 == null) {
                structure.put("F1", emptyTeam);
            }else {
                structure.put("F1", teamSimpleMapper.toDTO(f1));
            }

            Team f2 = round.getSemisMatchups().get(1).getWinner();
            if(f2 == null) {
                structure.put("F2", emptyTeam);
            }else {
                structure.put("F2", teamSimpleMapper.toDTO(f2));
            }
        }

        if(round.getFinalsMatchup() != null && round.getFinalsMatchup().getWinner() != null) {
            structure.put("W1", teamSimpleMapper.toDTO(round.getFinalsMatchup().getWinner()));
        }else {
            structure.put("W1", emptyTeam);
        }

        return structure;
    }

    @RequestMapping("/seasons/{year}/playoffs/matches")
    public Map<String, List<MatchupGameDTO>> getPlayoffsRoundMatches(@PathVariable String year) {

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


        // mapping
        Map<String, List<MatchupGameDTO>> matchesMapped = new HashMap<>();
        for(Map.Entry<String, List<Game>> entry : matches.entrySet()) {
            matchesMapped.put(entry.getKey(), matchupGameMapper.toDTO(entry.getValue()));
        }

        return matchesMapped;
    }

    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------
    // Mapstruct FAKES!
    // -------------------------------------------------------------------------------------------------

    private List<TeamCoeffsDTO> getTeamsWithCoeffsAndSeed(Season season, List<Team> teams, Map<Seed, List<Team>> teamsInRounds) {

        List<Season> seasonsPast = serviceUtils.loadAllSeasons().subList(0, season.getSeasonYear()-1);
        List<TeamCoeffsDTO> theTeams = new ArrayList<>();

        if(season.getSeasonYear() > 1) {
            // remove champ here grom groups for view
            Team champion = teamsInRounds.get(Seed.CHAMPION).get(0);
            teamsInRounds.get(Seed.TO_GROUPS).remove(champion);
        }

        for (Team team : teams) {
            TeamCoeffsDTO teamDTO = teamCoeffsMapper.toDTO(team);
            teamDTO.setTrophies(team.getTrophies()); // why you not work on your own ?

            if(season.getSeasonYear() > 1) {
                int p1 = 0;
                for(Season season1 : seasonsPast) {
                    p1 += team.getStatsForGroup(season1).getPoints();
                }
                teamDTO.setCoefficients(p1);
            }else {
                teamDTO.setCoefficients(0);
            }

            for(Map.Entry<Seed, List<Team>> entry : teamsInRounds.entrySet()) {
                if(entry.getValue().contains(team)) {
                    teamDTO.setSeed(entry.getKey());
                    break;
                }
            }

            theTeams.add(teamDTO);
        }

        Collections.sort(theTeams, Comparator.comparingInt(TeamCoeffsDTO::getCoefficients).reversed());
        return theTeams;
    }

    private List<TeamCoeffsDTO> getTeamsWithCoeffsAndSeed(Season season, List<Team> teams, Seed seed) {
        List<Season> seasonsPast = serviceUtils.loadAllSeasons().subList(0, season.getSeasonYear());

        List<TeamCoeffsDTO> theTeams = new ArrayList<>();

        for (Team team : teams) {
            TeamCoeffsDTO teamDTO = teamCoeffsMapper.toDTO(team);
            teamDTO.setSeed(seed);

            if(season.getSeasonYear() > 1) {
                int p1 = 0;
                for(Season season1 : seasonsPast) {
                    p1 += team.getStatsForGroup(season1).getPoints();
                }
                teamDTO.setCoefficients(p1);
            }else {
                teamDTO.setCoefficients(0);
            }

            theTeams.add(teamDTO);
        }

        Collections.sort(theTeams, Comparator.comparingInt(TeamCoeffsDTO::getCoefficients).reversed());
        return theTeams;
    }


}
