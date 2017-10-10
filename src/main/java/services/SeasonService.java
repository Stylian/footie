package main.java.services;

import org.apache.log4j.Logger;
import org.hibernate.Session;

public class SeasonService {

	final static Logger logger = Logger.getLogger(SeasonService.class);

	private Session session;

	public SeasonService(Session session) {
		this.session = session;
	}

	public void createSeason() {
		// TODO Auto-generated method stub
		
	}
	
}
