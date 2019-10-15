package gr.manolis.stelios.footie.api.controllers;


import gr.manolis.stelios.footie.api.services.ViewsService;
import gr.manolis.stelios.footie.core.Utils;
import gr.manolis.stelios.footie.core.peristence.dtos.Team;
import gr.manolis.stelios.footie.core.peristence.dtos.games.Game;
import gr.manolis.stelios.footie.core.peristence.dtos.games.MatchupGame;
import gr.manolis.stelios.footie.core.peristence.dtos.groups.Season;
import gr.manolis.stelios.footie.core.peristence.dtos.matchups.Matchup;
import gr.manolis.stelios.footie.core.peristence.dtos.rounds.PlayoffsRound;
import gr.manolis.stelios.footie.core.services.*;
import org.apache.log4j.Logger;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.transaction.Transactional;
import java.text.DecimalFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@Transactional
@RequestMapping("/rest")
public class RestNextGameController {

    final static Logger logger = Logger.getLogger(RestNextGameController.class);

    @Autowired
    private QualsService qualsService;

    @Autowired
    private GroupsRoundService groupsRoundService;

    @Autowired
    private PlayoffsRoundService playoffsRoundService;

    @Autowired
    private ServiceUtils serviceUtils;

    @Autowired
    private ViewsService viewsService;

    @Autowired
    private GameService gameService;

    @Autowired
    private RestOperationsController restOperationsController;

    @Autowired
    private RestSeasonController restSeasonController;

    @Autowired
    private SessionFactory sessionFactory;

    @RequestMapping("/next_game")
    public Map<String, Object> getNextGameAndMoveStages() {
        logger.info("getNextGame");

        Map<String, Object> data = new HashMap<>();

        if (serviceUtils.getNumberOfSeasons() < 1) {
            data.put("game", null);
            return data;
        }

        Game game = gameService.getNextGame();

        // no more games so move to next stage
        if (game == null) {
            Map<String, String> rounds = restSeasonController.seasonStatus("" + serviceUtils.loadCurrentSeason().getSeasonYear());
            for (Map.Entry<String, String> round : rounds.entrySet()) {
                if ("PLAYING".equals(round.getValue())) {

                    switch (round.getKey()) {
                        case "quals0":
                            qualsService.endQualsRound("0");
                            restOperationsController.seedQualsRound("1");
                            break;
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
                            PlayoffsRound playoffsRound = (PlayoffsRound) season.getRounds().get(5);
                            if (playoffsRound.getQuarterMatchups().get(0).getWinner() == null
                                    || playoffsRound.getQuarterMatchups().get(1).getWinner() == null) {
                                break;
                            }
                            if (CollectionUtils.isEmpty(playoffsRound.getSemisMatchups())) {
                                playoffsRoundService.endPlayoffsQuarters();
                                restOperationsController.seedAndSetSemifinals();
                            } else {
                                if (playoffsRound.getSemisMatchups().get(0).getWinner() == null
                                        || playoffsRound.getSemisMatchups().get(1).getWinner() == null) {
                                    break;
                                }

                                if (playoffsRound.getFinalsMatchup() == null) {
                                    playoffsRoundService.endPlayoffsSemis();
                                    restOperationsController.seedAndSetFinals();
                                } else {
                                    if (playoffsRound.getFinalsMatchup().getWinner() != null) {
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


        DecimalFormat numberFormat = new DecimalFormat("0.00");
        data.put("game", game);
        if (game != null) {
            data.put("homeData", viewsService.gameStats(game.getHomeTeam()));
            data.put("awayData", viewsService.gameStats(game.getAwayTeam()));
            if (game instanceof MatchupGame) {
                MatchupGame mGame = (MatchupGame) game;
                Matchup matchup = mGame.getMatchup();
                double homeOdds = Utils.calculateWinningOdds(matchup.getTeamHome().getAllStats().getElo(), matchup.getTeamAway().getAllStats().getElo());
                double decHomeOdds = 1 / homeOdds;
                double decAwayOdds = 1 / (1 - homeOdds);
                if (mGame.getHomeTeam().equals(matchup.getTeamHome())) {
                    data.put("winOdds", Math.round(homeOdds * 100));
                    data.put("decHomeOdds", numberFormat.format(0.05 * Math.round(decHomeOdds / 0.05)));
                    data.put("decAwayOdds", numberFormat.format(0.05 * Math.round(decAwayOdds / 0.05)));
                } else {
                    data.put("winOdds", Math.round((1 - homeOdds) * 100));
                    data.put("decAwayOdds", numberFormat.format(0.05 * Math.round(decHomeOdds / 0.05)));
                    data.put("decHomeOdds", numberFormat.format(0.05 * Math.round(decAwayOdds / 0.05)));
                }
            } else {
                data.put("winOdds", -1);
            }

            // past encounters
            List<Game> encounters = sessionFactory.getCurrentSession().createQuery(
                    "from GAMES where HOME_TEAM_ID=" + game.getHomeTeam().getId() + " and " +
                            " AWAY_TEAM_ID=" + game.getAwayTeam().getId()).list();

            List<Game> pastEncounters = encounters.stream()
                    .filter(g -> g.getResult() != null)
                    .collect(Collectors.toList());

            data.put("encounters", pastEncounters);
        }

        return data;
    }

}
