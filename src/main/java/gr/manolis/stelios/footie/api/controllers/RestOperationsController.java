package gr.manolis.stelios.footie.api.controllers;

import gr.manolis.stelios.footie.api.RestResponse;
import gr.manolis.stelios.footie.api.services.OperationsService;
import gr.manolis.stelios.footie.core.peristence.dtos.Stage;
import gr.manolis.stelios.footie.core.peristence.dtos.games.Result;
import gr.manolis.stelios.footie.core.peristence.dtos.groups.Season;
import gr.manolis.stelios.footie.core.peristence.dtos.rounds.GroupsRound;
import gr.manolis.stelios.footie.core.peristence.dtos.rounds.PlayoffsRound;
import gr.manolis.stelios.footie.core.peristence.dtos.rounds.QualsRound;
import gr.manolis.stelios.footie.core.services.ServiceUtils;
import org.apache.commons.lang3.math.NumberUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/rest/ops")
public class RestOperationsController {

    @Autowired
    private OperationsService operationsService;

    @Autowired
    private RestNextGameController restNextGameController;

    @Autowired
    private ServiceUtils serviceUtils;

    @GetMapping("/league/can_create_season")
    public Object[] canCreateLeague() {

        boolean canCreate = false;
        if (serviceUtils.getNumberOfSeasons() == 0) {
            canCreate = true;
        } else {
            canCreate = serviceUtils.loadCurrentSeason().getStage() == Stage.FINISHED;
        }
        return new Object[]{canCreate, serviceUtils.getNumberOfSeasons()};
    }

    @PostMapping("/season/create")
    public RestResponse createSeason() {
        Season season = operationsService.createSeason();
        operationsService.setUpSeason();

        if(season.getSeasonYear() == 1) {
            operationsService.seedQualsRound1();
        }else {
            operationsService.seedQualsRound0();
        }

        return new RestResponse(RestResponse.SUCCESS, "created " + season.getName());
    }

    // to remove
    @PostMapping("/season/setup")
    public RestResponse setUpSeason() {
        Season season = operationsService.setUpSeason();
        return new RestResponse(RestResponse.SUCCESS, "set " + season.getName());
    }

    @PostMapping("/quals/{num}/seed")
    public RestResponse seedQualsRound(@PathVariable String num) {

        int qn = NumberUtils.toInt(num);

        QualsRound round = (qn == 1) ? operationsService.seedQualsRound1()
                : (qn == 2 ? operationsService.seedQualsRound2()
                : operationsService.seedQualsRound0());
        return new RestResponse(RestResponse.SUCCESS, "seeded " + round.getName());

    }

    @PostMapping("/quals/{num}/set")
    public RestResponse setQualsRound(@PathVariable String num) {

        int qn = NumberUtils.toInt(num);

        QualsRound round = (qn == 1) ? operationsService.setQualsRound1()
                : (qn == 2 ? operationsService.setQualsRound2()
                : operationsService.setQualsRound0());
        return new RestResponse(RestResponse.SUCCESS, "set " + round.getName());

    }

    @PostMapping("/groups/1/seed")
    public RestResponse seedGroupsRoundOf12() {

        GroupsRound round = operationsService.seedGroupsRoundOf12();
        return new RestResponse(RestResponse.SUCCESS, "seeded " + round.getName());

    }

    @PostMapping("/groups/1/set")
    public RestResponse setGroupsRoundOf12() {

        GroupsRound round = operationsService.setGroupsRoundOf12();
        return new RestResponse(RestResponse.SUCCESS, "set " + round.getName());

    }

    @PostMapping("/groups/2/seedAndSet")
    public RestResponse seedAndSetGroupsRoundOf8() {

        GroupsRound round = operationsService.seedAndSetGroupsRoundOf8();
        return new RestResponse(RestResponse.SUCCESS, "seeded and set " + round.getName());

    }

    @PostMapping("/playoffs/quarterfinals/seedAndSet")
    public RestResponse seedAndSetQuarterfinals() {

        PlayoffsRound round = operationsService.seedAndSetQuarterfinals();
        return new RestResponse(RestResponse.SUCCESS, "seeded and set " + round.getName());

    }

    @PostMapping("/playoffs/semifinals/seedAndSet")
    public RestResponse seedAndSetSemifinals() {

        PlayoffsRound round = operationsService.seedAndSetSemifinals();
        return new RestResponse(RestResponse.SUCCESS, "seeded and set " + round.getName());

    }

    @PostMapping("/playoffs/finals/seedAndSet")
    public RestResponse seedAndSetFinals() {

        PlayoffsRound round = operationsService.seedAndSetFinals();
        return new RestResponse(RestResponse.SUCCESS, "seeded and set " + round.getName());

    }

    @PostMapping("/season/end")
    public RestResponse endSeason() {
        Season season = operationsService.endSeason();
        return new RestResponse(RestResponse.SUCCESS, "ended " + season.getName());
    }

    @ResponseBody
    @PostMapping("/add_game_result/{game_id}")
    public RestResponse addGame(@RequestBody Result result, @PathVariable("game_id") String gameId) {

        int id = Integer.parseInt(gameId);
        operationsService.addResult(id, result);
        restNextGameController.getNextGameAndMoveStages();

        return new RestResponse(RestResponse.SUCCESS, "game result added ");
    }

    // used for testing, do not access
    @GetMapping("/fill")
    public RestResponse fillGamesTEST1() {
        return operationsService.fillGamesTEST();
    }

}
