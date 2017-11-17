package api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import api.repositories.LeagueRepository;
import core.peristence.dtos.League;


@Service
public class LeagueService {
	
  @Autowired
  private LeagueRepository leagueRepository;
  
	public League getLeague() {
		return leagueRepository.findAll().iterator().next();
	}

	public League createLeague() {

		League league = new League();
		
		leagueRepository.save(league);
		
		return league;
	}
	
}
