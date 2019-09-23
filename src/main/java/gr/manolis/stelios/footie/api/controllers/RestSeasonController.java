package gr.manolis.stelios.footie.api.controllers;


import gr.manolis.stelios.footie.api.RestResponse;
import gr.manolis.stelios.footie.api.dtos.MatchupGameDTO;
import gr.manolis.stelios.footie.api.dtos.RobinGroupDTO;
import gr.manolis.stelios.footie.api.dtos.TeamCoeffsDTO;
import gr.manolis.stelios.footie.api.dtos.TeamSimpleDTO;
import gr.manolis.stelios.footie.api.mappers.*;
import gr.manolis.stelios.footie.api.services.ViewsService;
import gr.manolis.stelios.footie.core.peristence.DataAccessObject;
import gr.manolis.stelios.footie.core.peristence.dtos.Player;
import gr.manolis.stelios.footie.core.peristence.dtos.Seed;
import gr.manolis.stelios.footie.core.peristence.dtos.Stage;
import gr.manolis.stelios.footie.core.peristence.dtos.Team;
import gr.manolis.stelios.footie.core.peristence.dtos.games.Game;
import gr.manolis.stelios.footie.core.peristence.dtos.groups.RobinGroup;
import gr.manolis.stelios.footie.core.peristence.dtos.groups.Season;
import gr.manolis.stelios.footie.core.peristence.dtos.rounds.GroupsRound;
import gr.manolis.stelios.footie.core.peristence.dtos.rounds.PlayoffsRound;
import gr.manolis.stelios.footie.core.peristence.dtos.rounds.QualsRound;
import gr.manolis.stelios.footie.core.peristence.dtos.rounds.Round;
import gr.manolis.stelios.footie.core.services.SeasonService;
import gr.manolis.stelios.footie.core.services.ServiceUtils;
import gr.manolis.stelios.footie.core.tools.CoefficientsRangeOrdering;
import gr.manolis.stelios.footie.core.tools.CoefficientsRangeOrderingDTO;
import gr.manolis.stelios.footie.core.tools.RobinGroupOrdering;
import org.apache.commons.collections4.ListUtils;
import org.apache.commons.lang3.math.NumberUtils;
import org.apache.log4j.Logger;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.*;

@RestController
@Transactional
@RequestMapping("/rest/seasons")
public class RestSeasonController {

    final static Logger logger = Logger.getLogger(RestSeasonController.class);

    @Autowired
    private SessionFactory sessionFactory;

    @Autowired
    private SeasonService seasonService;

    @Autowired
    private ViewsService viewsService;

    @Autowired
    private ServiceUtils serviceUtils;

    @Autowired
    private TeamSimpleMapper teamSimpleMapper;

    @Autowired
    private PlayerMapper playerMapper;

    @Autowired
    private TeamCoeffsMapper teamCoeffsMapper;

    @Autowired
    private RobinGroupMapper robinGroupMapper;

    @Autowired
    private MatchupGameMapper matchupGameMapper;

     @RequestMapping("/")
    public int seasonYear() {
        return serviceUtils.getNumberOfSeasons();
    }

    @RequestMapping("/{year}/status")
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

    @RequestMapping("/{year}/seeding")
    public List<TeamCoeffsDTO>  seasonSeeding(@PathVariable(value = "year", required = true) String strYear) {
        logger.info("season seeding");

        int year = NumberUtils.toInt(strYear);

        Season season = serviceUtils.loadSeason(year);
        List<Team> teams = season.getTeams();
        logger.info("loaded teams: " + teams);

        Map<Seed, List<Team>> teamsInRounds = null;
        if (season.getSeasonYear() != 1) {
            teamsInRounds = seasonService.checkWhereTeamsAreSeededForASeason(season);
        } else { // just for viewing
            teamsInRounds = new HashMap<>();
            teamsInRounds.put(Seed.TO_QUALS_1, teams);
            teamsInRounds.put(Seed.TO_PRELIMINARY, Collections.emptyList());
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
    @RequestMapping("/{year}/quals/{round}/seeding")
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
            Collections.sort(qr.getTeams(), new CoefficientsRangeOrdering(serviceUtils.loadAllSeasons(),
                    season.getSeasonYear()-1));
            if(round == 1) {
                teamsStrong = qr.getTeams().subList(0, 13);
                teamsWeak = qr.getTeams().subList(13, qr.getTeams().size());
            }else { // playoffs round
                if(season.getSeasonYear() == 1) {
                    if(qr.getTeams().size() < 12) {
                        teamsStrong = qr.getTeams();
                    }else {
                        teamsStrong = qr.getTeams().subList(0, 12);
                        teamsWeak = qr.getTeams().subList(12, qr.getTeams().size());
                    }
                }else {
                    if(qr.getTeams().size() < 10) {
                        teamsStrong = qr.getTeams();
                    }else {
                        teamsStrong = qr.getTeams().subList(0, 9);
                        teamsWeak = qr.getTeams().subList(9, qr.getTeams().size());
                    }
                }
            }
        }

        List<TeamCoeffsDTO> teamsStrongWithCoeffs = getTeamsWithCoeffsAndSeed(season, teamsStrong, Seed.STRONG);
        List<TeamCoeffsDTO> teamsWeakWithCoeffs = getTeamsWithCoeffsAndSeed(season, teamsWeak, Seed.WEAK);

        Map<Seed, List<TeamCoeffsDTO>>  qualsTeams = new HashMap<>();
        qualsTeams.put(Seed.STRONG, teamsStrongWithCoeffs);
        qualsTeams.put(Seed.WEAK, teamsWeakWithCoeffs);

        return qualsTeams;
    }

    @RequestMapping("/{year}/quals/{round}/matches")
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
    @RequestMapping("/{year}/groups/{round}/seeding")
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
            Collections.sort(qr.getTeams(), new CoefficientsRangeOrdering(serviceUtils.loadAllSeasons(),
                    season.getSeasonYear()-1));
            if(qr.getTeams().size() < 5) {
                teamsStrong = qr.getTeams();
            }else if(qr.getTeams().size() < 9) {
                List<List<Team>> listsOfTeams = ListUtils.partition(qr.getTeams(), 4);
                teamsStrong = listsOfTeams.get(0);
                teamsMedium = listsOfTeams.get(1);
            }else {
                List<List<Team>> listsOfTeams = ListUtils.partition(qr.getTeams(), 4);
                teamsStrong = listsOfTeams.get(0);
                teamsMedium = listsOfTeams.get(1);
                teamsWeak = listsOfTeams.get(2);
            }

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
        for(RobinGroup rg : groups) {
            Collections.sort(rg.getTeams(), new RobinGroupOrdering(rg,
                    serviceUtils.loadAllSeasons(), season.getSeasonYear()-1));
        }
        List<RobinGroupDTO> groupsDTO = robinGroupMapper.toDTO(groups);

        return groupsDTO;
    }

    @RequestMapping("/{year}/playoffs/structure")
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

    @RequestMapping("/{year}/playoffs/matches")
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

    @RequestMapping("/{year}/overview")
    public Map<String, Object> seasonOverview(
            @PathVariable(value = "year", required = true) String strYear) {

        int year = NumberUtils.toInt(strYear);
        Season season = serviceUtils.loadSeason(year);

        Map<String, Object> dataFromSeason = seasonService.getPostSeasonData(season);
        Map<String, Object> data = new HashMap<>();
        data.put("winner", teamSimpleMapper.toDTO((Team) dataFromSeason.get("winner")));
        data.put("runner_up", teamSimpleMapper.toDTO((Team) dataFromSeason.get("runner_up")));
        data.put("semifinalist1", teamSimpleMapper.toDTO((Team) dataFromSeason.get("semifinalist1")));
        data.put("semifinalist2", teamSimpleMapper.toDTO((Team) dataFromSeason.get("semifinalist2")));
        data.put("quarterfinalist1", teamSimpleMapper.toDTO((Team) dataFromSeason.get("quarterfinalist1")));
        data.put("quarterfinalist2", teamSimpleMapper.toDTO((Team) dataFromSeason.get("quarterfinalist2")));

        data.put("bestWin", dataFromSeason.get("bestWin"));
        data.put("highestScoringGame", dataFromSeason.get("highestScoringGame"));
        data.put("worstResult", dataFromSeason.get("worstResult"));

        data.put("overachievers", teamSimpleMapper.toDTO((Team) dataFromSeason.get("overachievers")));
        data.put("underperformers", teamSimpleMapper.toDTO((Team) dataFromSeason.get("underperformers")));

        data.put("player_of_the_year", playerMapper.toDTO((Player) dataFromSeason.get("player_of_the_year")));

        data.put("gk", playerMapper.toDTO((Player) dataFromSeason.get("gk")));
        data.put("dl", playerMapper.toDTO((Player) dataFromSeason.get("dl")));
        data.put("dr", playerMapper.toDTO((Player) dataFromSeason.get("dr")));
        data.put("dcl", playerMapper.toDTO((Player) dataFromSeason.get("dcl")));
        data.put("dcr", playerMapper.toDTO((Player) dataFromSeason.get("dcr")));
        data.put("cml", playerMapper.toDTO((Player) dataFromSeason.get("cml")));
        data.put("cmr", playerMapper.toDTO((Player) dataFromSeason.get("cmr")));
        data.put("amr", playerMapper.toDTO((Player) dataFromSeason.get("amr")));
        data.put("aml", playerMapper.toDTO((Player) dataFromSeason.get("aml")));
        data.put("amc", playerMapper.toDTO((Player) dataFromSeason.get("amc")));
        data.put("st", playerMapper.toDTO((Player) dataFromSeason.get("st")));

        boolean haveToPublish = false;
        if(season.getDreamTeamGK() == null
            || season.getDreamTeamDCL() == null
            || season.getDreamTeamDCR() == null
            || season.getDreamTeamDL() == null
            || season.getDreamTeamDR() == null
            || season.getDreamTeamCML() == null
            || season.getDreamTeamCMR() == null
            || season.getDreamTeamAMC() == null
            || season.getDreamTeamAMR() == null
            || season.getDreamTeamAML() == null
            || season.getDreamTeamST() == null
        ) {
            haveToPublish = true;
        }
        data.put("haveToPublish", haveToPublish);

        return data;
    }

    @ResponseBody
    @PostMapping("/{year}/publish")
    public RestResponse publishOverview( @PathVariable(value = "year", required = true) String strYear,
            @RequestParam(name = "overachievers", required = false) String overachieversId,
            @RequestParam(name = "underperformers", required = false) String underperformersId,
            @RequestParam(name = "playerOfTheYear", required = false) String playerOfTheYearId,
            @RequestParam(name = "gk", required = false) String gkId,
            @RequestParam(name = "dcl", required = false) String dclId,
            @RequestParam(name = "dcr", required = false) String dcrId,
            @RequestParam(name = "dl", required = false) String dlId,
            @RequestParam(name = "dr", required = false) String drId,
            @RequestParam(name = "cml", required = false) String cmlId,
            @RequestParam(name = "cmr", required = false) String cmrId,
            @RequestParam(name = "aml", required = false) String amlId,
            @RequestParam(name = "amr", required = false) String amrId,
            @RequestParam(name = "amc", required = false) String amcId,
            @RequestParam(name = "st", required = false) String stId
            ) {

        int year = NumberUtils.toInt(strYear);
        Season season = serviceUtils.loadSeason(year);

        if(!"null".equals(overachieversId)) {
            int id = Integer.parseInt(overachieversId);
            Team team = serviceUtils.loadTeam(id);
            season.setOverachiever(team);
        }

        if(!"null".equals(underperformersId)) {
            int id = Integer.parseInt(underperformersId);
            Team team = serviceUtils.loadTeam(id);
            season.setUnderperformer(team);
        }

        if(!"null".equals(playerOfTheYearId)) {
            int id = Integer.parseInt(playerOfTheYearId);
            Player player = serviceUtils.loadPlayer(id);
            season.setPlayerOfTheSeason(player);
        }

        if(!"null".equals(gkId)) {
            int id = Integer.parseInt(gkId);
            Player player = serviceUtils.loadPlayer(id);
            season.setDreamTeamGK(player);
        }

        if(!"null".equals(dclId)) {
            int id = Integer.parseInt(dclId);
            Player player = serviceUtils.loadPlayer(id);
            season.setDreamTeamDCL(player);
        }

        if(!"null".equals(dcrId)) {
            int id = Integer.parseInt(dcrId);
            Player player = serviceUtils.loadPlayer(id);
            season.setDreamTeamDCR(player);
        }

        if(!"null".equals(dlId)) {
            int id = Integer.parseInt(dlId);
            Player player = serviceUtils.loadPlayer(id);
            season.setDreamTeamDL(player);
        }

        if(!"null".equals(drId)) {
            int id = Integer.parseInt(drId);
            Player player = serviceUtils.loadPlayer(id);
            season.setDreamTeamDR(player);
        }

        if(!"null".equals(cmlId)) {
            int id = Integer.parseInt(cmlId);
            Player player = serviceUtils.loadPlayer(id);
            season.setDreamTeamCML(player);
        }

        if(!"null".equals(cmrId)) {
            int id = Integer.parseInt(cmrId);
            Player player = serviceUtils.loadPlayer(id);
            season.setDreamTeamCMR(player);
        }

        if(!"null".equals(amlId)) {
            int id = Integer.parseInt(amlId);
            Player player = serviceUtils.loadPlayer(id);
            season.setDreamTeamAML(player);
        }

        if(!"null".equals(amrId)) {
            int id = Integer.parseInt(amrId);
            Player player = serviceUtils.loadPlayer(id);
            season.setDreamTeamAMR(player);
        }

        if(!"null".equals(amcId)) {
            int id = Integer.parseInt(amcId);
            Player player = serviceUtils.loadPlayer(id);
            season.setDreamTeamAMC(player);
        }

        if(!"null".equals(stId)) {
            int id = Integer.parseInt(stId);
            Player player = serviceUtils.loadPlayer(id);
            season.setDreamTeamST(player);
        }

        DataAccessObject<Season> dao = new DataAccessObject<>(sessionFactory.getCurrentSession());
        dao.save(season);

        return new RestResponse(RestResponse.SUCCESS, "published season data");
    }

    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------
    // Mapstruct FAKES!
    // -------------------------------------------------------------------------------------------------

    private List<TeamCoeffsDTO> getTeamsWithCoeffsAndSeed(Season season, List<Team> teams, Map<Seed, List<Team>> teamsInRounds) {

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
                int p1 = serviceUtils.getCoefficientsUntilSeason(team, season.getSeasonYear()-1);
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

        Collections.sort(theTeams, new CoefficientsRangeOrderingDTO());
        return theTeams;
    }

    private List<TeamCoeffsDTO> getTeamsWithCoeffsAndSeed(Season season, List<Team> teams, Seed seed) {

        List<TeamCoeffsDTO> theTeams = new ArrayList<>();

        for (Team team : teams) {
            TeamCoeffsDTO teamDTO = teamCoeffsMapper.toDTO(team);
            teamDTO.setSeed(seed);

            if(season.getSeasonYear() > 1) {
                int p1 = serviceUtils.getCoefficientsUntilSeason(team, season.getSeasonYear()-1);
                teamDTO.setCoefficients(p1);
            }else {
                teamDTO.setCoefficients(0);
            }

            theTeams.add(teamDTO);
        }

        Collections.sort(theTeams, new CoefficientsRangeOrderingDTO());
        return theTeams;
    }


}
