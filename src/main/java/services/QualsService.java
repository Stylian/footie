package main.java.services;

import org.apache.log4j.Logger;
import org.hibernate.Session;

import main.java.Utils;
import main.java.dtos.Season;
import main.java.dtos.rounds.QualsRound;

public class QualsService {

	final static Logger logger = Logger.getLogger(QualsService.class);

	private Session session;

	public QualsService(Session session) {
		this.session = session;
	}
	
	public void setUpQualsRound1() {
		
		SeasonService seasonService = new SeasonService(session);
		Season season = seasonService.loadCurrentSeason();

		QualsRound roundQuals1 = (QualsRound) season.getRounds().get(0);
		System.out.println("1st quals " + Utils.toString(roundQuals1.getTeams()));
		
	}
	
}
