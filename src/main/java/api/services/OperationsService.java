package api.services;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import core.peristence.HibernateUtils;
import core.peristence.dtos.League;
import core.peristence.dtos.groups.Season;
import core.peristence.dtos.rounds.GroupsRound;
import core.peristence.dtos.rounds.PlayoffsRound;
import core.peristence.dtos.rounds.QualsRound;
import core.services.BootService;
import core.services.GroupsRoundService;
import core.services.PlayoffsRoundService;
import core.services.QualsService;
import core.services.SeasonService;

@Service
public class OperationsService {
	
  @Autowired
  private SessionFactory sessionFactory;
  
	@PostConstruct
	public void initIt() {
		HibernateUtils.setSessionFactory(sessionFactory);
	}

	public League createLeague() {
		
		BootService bs = new BootService();
		return bs.loadLeague();

	}

	public Season createSeason() {

		SeasonService service = new SeasonService();
		return service.createSeason();

	}

	public Season setUpSeason() {

		SeasonService service = new SeasonService();
		return service.setUpSeason();

	}

	public QualsRound seedQualsRound1() {

		QualsService service = new QualsService();
		return service.seedUpQualsRound1();

	}

	public QualsRound setQualsRound1() {

		QualsService service = new QualsService();
		return service.setUpQualsRound1();

	}
	
	public QualsRound seedQualsRound2() {
		
		QualsService service = new QualsService();
		return service.seedUpQualsRound2();
		
	}
	
	public QualsRound setQualsRound2() {
		
		QualsService service = new QualsService();
		return service.setUpQualsRound2();
		
	}
	
	public GroupsRound seedGroupsRoundOf12() {
		
		GroupsRoundService service = new GroupsRoundService();
		return service.seedGroupsRoundOf12();
		
	}
	
	public GroupsRound setGroupsRoundOf12() {
		
		GroupsRoundService service = new GroupsRoundService();
		return service.setUpGroupsRoundOf12();
		
	}
	
	public GroupsRound seedAndSetGroupsRoundOf8() {

		GroupsRoundService service = new GroupsRoundService();
		return service.seedAndSetGroupsRoundOf8();
		
	}
	
	public PlayoffsRound seedAndSetQuarterfinals() {
		
		PlayoffsRoundService service = new PlayoffsRoundService();
		return service.seedAndSetQuarterfinals();
		
	}
	
	public PlayoffsRound seedAndSetSemifinals() {
		
		PlayoffsRoundService service = new PlayoffsRoundService();
		return service.seedAndSetSemifinals();
		
	}
	
	public PlayoffsRound seedAndSetFinals() {
		
		PlayoffsRoundService service = new PlayoffsRoundService();
		return service.seedAndSetfinals();
		
	}
	
	public Season endSeason() {
		
		SeasonService service = new SeasonService();
		return service.endCurrentSeason();
		
	}
	

	
	
	
	
	
	
	
	
	
	
	
	
	/**
	 * not nessesary but keep around
	 * @throws Exception
	 */
	@PreDestroy
	public void cleanUp() throws Exception {
		HibernateUtils.closeSession();
		HibernateUtils.closeFactory();
	}
  
}
