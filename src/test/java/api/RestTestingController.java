package api;

import org.apache.commons.lang3.RandomUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import api.RestResponse;
import core.peristence.dtos.games.Game;
import core.peristence.dtos.games.Result;
import core.services.GameService;

@RestController
@RequestMapping("/rest/test")
public class RestTestingController {

	@Autowired
	private GameService gameService;

	@RequestMapping("/fillGames")
	public RestResponse fillGamesTEST() {

		while (true) {

			Game next = gameService.getNextGame();

			if (next == null) {
				break;
			}

			gameService.addResult(next, new Result(RandomUtils.nextInt(0, 5), RandomUtils.nextInt(0, 2)));

			System.out.println(next);

		}

		return new RestResponse(RestResponse.SUCCESS, "games added");
	}

}
