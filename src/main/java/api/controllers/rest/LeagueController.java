package api.controllers.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import api.services.LeagueService;

@RestController
@RequestMapping("/rest")
public class LeagueController {
  
	@Autowired
  private LeagueService myService;
	
  @RequestMapping("/league")
  public String redirToList(){
      return "hello";
  }
  
  
}
