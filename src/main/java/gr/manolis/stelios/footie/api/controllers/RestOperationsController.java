package gr.manolis.stelios.footie.api.controllers;

import org.apache.commons.lang3.math.NumberUtils;
import org.springframework.beans.factory.annotation.Autowired;
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
	private OperationsService myService;

	@PostMapping("/league")
	@ResponseBody
	public RestResponse createLeague() {
		myService.createLeague();
		return new RestResponse(RestResponse.SUCCESS, "created league");
	}

	@PostMapping("/season/create")
	@ResponseBody
	public RestResponse createSeason() {
		Season season = myService.createSeason();
		return new RestResponse(RestResponse.SUCCESS, "created " + season.getName());
	}

	@PostMapping("/season/setup")
	@ResponseBody
	public RestResponse setUpSeason() {
		Season season = myService.setUpSeason();
		return new RestResponse(RestResponse.SUCCESS, "set " + season.getName());
	}

	@PostMapping("/quals/{num}/seed")
	@ResponseBody
	public RestResponse seedQualsRound(@PathVariable String num) {

		int qn = NumberUtils.toInt(num);

		if (qn > 2 || qn < 0) {
			return new RestResponse(RestResponse.ERROR, "only supporting 2 qualification rounds");
		}

		QualsRound round = (qn == 1) ? myService.seedQualsRound1() : myService.seedQualsRound2();
		return new RestResponse(RestResponse.SUCCESS, "seeded " + round.getName());

	}

	@PostMapping("/quals/{num}/set")
	@ResponseBody
	public RestResponse setQualsRound(@PathVariable String num) {

		int qn = NumberUtils.toInt(num);

		if (qn > 2 || qn < 0) {
			return new RestResponse(RestResponse.ERROR, "only supporting 2 qualification rounds");
		}

		QualsRound round = (qn == 1) ? myService.setQualsRound1() : myService.setQualsRound2();
		return new RestResponse(RestResponse.SUCCESS, "set " + round.getName());

	}

	@PostMapping("/groups/12/seed")
	@ResponseBody
	public RestResponse seedGroupsRoundOf12() {

		GroupsRound round = myService.seedGroupsRoundOf12();
		return new RestResponse(RestResponse.SUCCESS, "seeded " + round.getName());

	}

	@PostMapping("/groups/12/set")
	@ResponseBody
	public RestResponse setGroupsRoundOf12() {

		GroupsRound round = myService.setGroupsRoundOf12();
		return new RestResponse(RestResponse.SUCCESS, "set " + round.getName());

	}

	@PostMapping("/groups/8/seedAndSet")
	@ResponseBody
	public RestResponse seedAndSetGroupsRoundOf8() {

		GroupsRound round = myService.seedAndSetGroupsRoundOf8();
		return new RestResponse(RestResponse.SUCCESS, "seeded and set " + round.getName());

	}

	@PostMapping("/playoffs/quarterfinals/seedAndSet")
	@ResponseBody
	public RestResponse seedAndSetQuarterfinals() {

		PlayoffsRound round = myService.seedAndSetQuarterfinals();
		return new RestResponse(RestResponse.SUCCESS, "seeded and set " + round.getName());

	}

	@PostMapping("/playoffs/semifinals/seedAndSet")
	@ResponseBody
	public RestResponse seedAndSetSemifinals() {

		PlayoffsRound round = myService.seedAndSetSemifinals();
		return new RestResponse(RestResponse.SUCCESS, "seeded and set " + round.getName());

	}

	@PostMapping("/playoffs/finals/seedAndSet")
	@ResponseBody
	public RestResponse seedAndSetFinals() {

		PlayoffsRound round = myService.seedAndSetFinals();
		return new RestResponse(RestResponse.SUCCESS, "seeded and set " + round.getName());

	}

	@PostMapping("/season/end")
	@ResponseBody
	public RestResponse endSeason() {
		Season season = myService.endSeason();
		return new RestResponse(RestResponse.SUCCESS, "ended " + season.getName());
	}


	@PostMapping("/fillGames")
	public RestResponse fillGamesTEST() {

		return myService.fillGamesTEST();
	}
	
}
