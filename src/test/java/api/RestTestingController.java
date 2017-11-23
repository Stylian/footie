package api;

import org.apache.commons.lang3.RandomUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import api.RestResponse;
import core.peristence.dtos.games.Game;
import core.peristence.dtos.games.Result;
import core.services.GameService;

@RestController
@RequestMapping("/rest/test")
public class RestTestingController {
	
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
