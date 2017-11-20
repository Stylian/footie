package api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import api.services.MainService;
import core.peristence.dtos.League;
import core.peristence.dtos.groups.Season;

@RestController
@RequestMapping("/rest")
public class RestApiController {
  
	@Autowired
  private MainService myService;
	
  @RequestMapping("/league")
  public League getLeague(){
      return myService.getLeague();
  }
  
  @RequestMapping("/season/create")
  public Season createSeason(){
  	return myService.createSeason();
  }
  
  
}
