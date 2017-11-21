package api.controllers;

import org.apache.commons.lang3.RandomUtils;
import org.apache.commons.lang3.math.NumberUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import api.RestResponse;
import api.services.OperationsService;
import core.peristence.dtos.League;
import core.peristence.dtos.games.Game;
import core.peristence.dtos.games.Result;
import core.peristence.dtos.groups.Season;
import core.peristence.dtos.rounds.GroupsRound;
import core.peristence.dtos.rounds.QualsRound;
import core.services.GameService;

@RestController
@RequestMapping("/rest/ops")
public class RestOperationsController {

	@Autowired
	private OperationsService myService;

	@RequestMapping("/league")
	public RestResponse createLeague() {
		League league = myService.createLeague();
		return new RestResponse(RestResponse.SUCCESS, "created league");
	}

	@RequestMapping("/season/create")
	public RestResponse createSeason() {
		Season season = myService.createSeason();
		return new RestResponse(RestResponse.SUCCESS, "created " + season.getName());
	}

	@RequestMapping("/season/setup")
	public RestResponse setUpSeason() {
		Season season = myService.setUpSeason();
		return new RestResponse(RestResponse.SUCCESS, "set " + season.getName());
	}
	
	@RequestMapping("/quals/{num}/seed")
	public RestResponse seedQualsRound(@PathVariable String num) {
		
		int qn = NumberUtils.toInt(num);
		
		if(qn > 2 || qn < 0) {
			return new RestResponse(RestResponse.ERROR, "only supporting 2 qualification rounds");
		}
		
		QualsRound round = (qn == 1) ? myService.seedQualsRound1() : myService.seedQualsRound2();
		return new RestResponse(RestResponse.SUCCESS, "seeded " + round.getName());
		
	}
	
	@RequestMapping("/quals/{num}/set")
	public RestResponse setQualsRound(@PathVariable String num) {
		
		int qn = NumberUtils.toInt(num);
		
		if(qn > 2 || qn < 0) {
			return new RestResponse(RestResponse.ERROR, "only supporting 2 qualification rounds");
		}
		
		QualsRound round = (qn == 1) ? myService.setQualsRound1() : myService.setQualsRound2();
		return new RestResponse(RestResponse.SUCCESS, "set " + round.getName());
		
	}
	
	@RequestMapping("/groups/12/seed")
	public RestResponse seedGroupsRoundOf12() {
		
		GroupsRound round = myService.seedGroupsRoundOf12();
		return new RestResponse(RestResponse.SUCCESS, "seeded " + round.getName());
		
	}
	
	@RequestMapping("/groups/12/set")
	public RestResponse setGroupsRoundOf12() {
		
		GroupsRound round = myService.setGroupsRoundOf12();
		return new RestResponse(RestResponse.SUCCESS, "set " + round.getName());
		
	}
	
	@RequestMapping("/groups/8/seedAndSet")
	public RestResponse seedAndSetGroupsRoundOf8() {
		
		GroupsRound round = myService.seedAndSetGroupsRoundOf8();
		return new RestResponse(RestResponse.SUCCESS, "seeded and set " + round.getName());
		
	}
	
	
	
	
	
	
	
	
	
	
	
	
	@RequestMapping("/fillGames")
	public RestResponse fillGamesTEST() {

		GameService service = new GameService();

		while (true) {

			Game next = service.getNextGame();

			if (next == null) {
				break;
			}

			service.addResult(next, new Result(RandomUtils.nextInt(0, 5), RandomUtils.nextInt(0, 2)));

			System.out.println(next);

		}
		
		return new RestResponse(RestResponse.SUCCESS, "games added");
	}

}
