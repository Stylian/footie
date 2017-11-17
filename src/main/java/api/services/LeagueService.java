package api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import core.peristence.dtos.League;


@Service
public class LeagueService {
	
//  @Autowired
//  private LeagueRepository leagueRepository;
  
	public League getLeague() {
		return new League();
	}

	public League createLeague() {

		
		return new League();
	}
	
}
