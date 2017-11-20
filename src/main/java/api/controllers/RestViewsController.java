package api.controllers;

import java.util.List;

import org.apache.commons.lang3.math.NumberUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import api.services.ViewsService;
import core.peristence.dtos.League;
import core.peristence.dtos.groups.Season;

@RestController
@RequestMapping("/rest/views")
public class RestViewsController {

	@Autowired
  private ViewsService service;
	
	// league
  @RequestMapping("/league")
  public League getLeague(){
      return service.getLeague();
  }
  
  // season
  @RequestMapping("/season")
  public String getSeasonCurrent(){
  	return service.getCurrentSeason().toString();
  }
//  
//  @RequestMapping("/seasons")
//  public List<Season> getSeasons(){
//  	return service.getAllSeasons();
//  }
  
  @RequestMapping("/seasons/{year}")
  public String getSeason(@PathVariable String year){
  	return service.getSeason(NumberUtils.toInt(year)).toString();
  }

  // TODO
  
}
