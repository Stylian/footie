package api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import api.RestResponse;
import api.services.OperationsService;
import core.peristence.dtos.League;
import core.peristence.dtos.groups.Season;

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
		return new RestResponse(RestResponse.SUCCESS, "created " + season.getName());
	}

}
