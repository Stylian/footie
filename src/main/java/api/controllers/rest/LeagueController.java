package api.controllers.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import api.services.LeagueService;
import core.peristence.dtos.League;

@RestController
@RequestMapping("/rest")
public class LeagueController {
  
	@Autowired
  private LeagueService myService;
	
  @RequestMapping("/league")
  public League getLeague(){
      return myService.getLeague();
  }
  
  
}
