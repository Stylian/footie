package api.services;

import java.util.List;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;

import org.apache.commons.lang3.math.NumberUtils;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import core.peristence.HibernateUtils;
import core.peristence.dtos.League;
import core.peristence.dtos.groups.Season;
import core.peristence.dtos.rounds.GroupsRound;
import core.peristence.dtos.rounds.PlayoffsRound;
import core.peristence.dtos.rounds.QualsRound;
import core.peristence.dtos.rounds.Round;
import core.services.ServiceUtils;

@Service
public class ViewsService {
	
  @Autowired
  private SessionFactory sessionFactory;
  
	@PostConstruct
	public void initIt() {
		HibernateUtils.setSessionFactory(sessionFactory);
	}
	
	public League getLeague() {
		return ServiceUtils.getLeague();
	}
	
	public List<Season> getAllSeasons() {
		return ServiceUtils.loadAllSeasons();
	}
	
	public Season getCurrentSeason() {
		return ServiceUtils.loadCurrentSeason();
	}
	
	public Season getSeason(int year) {
		return ServiceUtils.loadSeason(year);
	}

	/**
	 * 
	 * @param year season number
	 * @param round 1 for 1st quals round , 2 for 2nd quals round
	 * @return
	 */
	public QualsRound getQualRound(int year, int round) {
  	
  	Season season = getSeason(year);
		List<Round> rounds = season.getRounds();
		return (QualsRound) rounds.get(round - 1);
		
	}
	
	/**
	 * 
	 * @param year season number
	 * @param round 1 for round of 12, 2 for round of 8
	 * @return
	 */
	public GroupsRound getGroupRound(int year, int round) {
		
		Season season = getSeason(year);
		List<Round> rounds = season.getRounds();
		return (GroupsRound) rounds.get(round + 1);
		
	}
	
	/**
	 * 
	 * @param year season number
	 * @return
	 */
	public PlayoffsRound getPlayoffsRound(int year) {
		
		Season season = getSeason(year);
		List<Round> rounds = season.getRounds();
		return (PlayoffsRound) rounds.get(4);
		
	}
	
	

  
}
