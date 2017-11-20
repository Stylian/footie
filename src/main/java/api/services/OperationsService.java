package api.services;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import core.peristence.HibernateUtils;
import core.peristence.dtos.League;
import core.peristence.dtos.groups.Season;
import core.services.BootService;
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

	public void seedQualsRound1() throws Exception {

		QualsService service = new QualsService();
		service.seedUpQualsRound1();

	}

	public void setQualsRound1() throws Exception {

		QualsService service = new QualsService();
		service.setUpQualsRound1();

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
