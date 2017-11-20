package api.services;

import java.util.List;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import core.peristence.HibernateUtils;
import core.peristence.dtos.League;
import core.peristence.dtos.groups.Season;
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
		return null;
	}
	
	public Season getCurrentSeason() {
		return ServiceUtils.loadCurrentSeason();
	}
	
	public Season getSeason(int year) {
		return ServiceUtils.loadSeason(year);
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
