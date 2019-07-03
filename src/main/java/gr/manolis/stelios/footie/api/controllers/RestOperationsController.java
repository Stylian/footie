package gr.manolis.stelios.footie.api.controllers;

import gr.manolis.stelios.footie.core.peristence.dtos.League;
import org.apache.commons.lang3.math.NumberUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import gr.manolis.stelios.footie.api.RestResponse;
import gr.manolis.stelios.footie.api.services.OperationsService;
import gr.manolis.stelios.footie.core.peristence.dtos.groups.Season;
import gr.manolis.stelios.footie.core.peristence.dtos.rounds.GroupsRound;
import gr.manolis.stelios.footie.core.peristence.dtos.rounds.PlayoffsRound;
import gr.manolis.stelios.footie.core.peristence.dtos.rounds.QualsRound;

@RestController
@RequestMapping("/rest/ops")
public class RestOperationsController {

	@Autowired
	private OperationsService operationsService;

	@PostMapping("/league")
	public ResponseEntity getOrCreateLeague() {
		League league = operationsService.createLeague();
		return ResponseEntity.ok().body(league);
	}

	@PostMapping("/season/create")
	public RestResponse createSeason() {
		Season season = operationsService.createSeason();
		operationsService.setUpSeason();
		operationsService.seedQualsRound1();

		return new RestResponse(RestResponse.SUCCESS, "created " + season.getName());
	}

	// to remove
	@PostMapping("/season/setup")
	public RestResponse setUpSeason() {
		Season season = operationsService.setUpSeason();
		return new RestResponse(RestResponse.SUCCESS, "set " + season.getName());
	}

	// maybe remove?
	@PostMapping("/quals/{num}/seed")
	public RestResponse seedQualsRound(@PathVariable String num) {

		int qn = NumberUtils.toInt(num);

		if (qn > 2 || qn < 0) {
			return new RestResponse(RestResponse.ERROR, "only supporting 2 qualification rounds");
		}

		QualsRound round = (qn == 1) ? operationsService.seedQualsRound1() : operationsService.seedQualsRound2();
		return new RestResponse(RestResponse.SUCCESS, "seeded " + round.getName());

	}

	@PostMapping("/quals/{num}/set")
	public RestResponse setQualsRound(@PathVariable String num) {

		int qn = NumberUtils.toInt(num);

		if (qn > 2 || qn < 0) {
			return new RestResponse(RestResponse.ERROR, "only supporting 2 qualification rounds");
		}

		QualsRound round = (qn == 1) ? operationsService.setQualsRound1() : operationsService.setQualsRound2();
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

	@PostMapping("/fillGames")
	public RestResponse fillGamesTEST() {

		return operationsService.fillGamesTEST();
	}

}
