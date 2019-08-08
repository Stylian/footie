package gr.manolis.stelios.footie.api.controllers;


import gr.manolis.stelios.footie.core.peristence.dtos.League;
import gr.manolis.stelios.footie.core.peristence.dtos.games.Game;
import gr.manolis.stelios.footie.core.peristence.dtos.groups.Season;
import gr.manolis.stelios.footie.core.peristence.dtos.rounds.PlayoffsRound;
import gr.manolis.stelios.footie.core.services.*;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.transaction.Transactional;
import java.util.Map;

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
    private GameService gameService;

    @Autowired
    private RestOperationsController restOperationsController;

    @Autowired
    private RestSeasonController restSeasonController;

    @RequestMapping("/next_game")
    public Game getNextGameAndMoveStages() {
        logger.info("getNextGame");

        League league = (League) (restOperationsController.getOrCreateLeague().getBody()); // runs only the very first time
        if (league.getSeasonNum() < 1) {
            return new Game();
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

}
