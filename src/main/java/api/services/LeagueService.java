package api.services;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import core.peristence.HibernateUtils;
import core.peristence.dtos.League;
import core.services.BootService;

@Service
public class LeagueService {
	
  @Autowired
  private SessionFactory sessionFactory;
  
	public League getLeague() {
		
		HibernateUtils.setSessionFactory(sessionFactory);
		
		BootService bs = new BootService();
		return bs.loadLeague();

	}
	
}
