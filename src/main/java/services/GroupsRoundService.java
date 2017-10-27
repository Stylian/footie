package main.java.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

import org.apache.log4j.Logger;
import org.hibernate.Session;

import main.java.DataAccessObject;
import main.java.PropertyUtils;
import main.java.dtos.Matchup;
import main.java.dtos.Season;
import main.java.dtos.Team;
import main.java.dtos.rounds.GroupsRound;
import main.java.dtos.rounds.QualsRound;

public class GroupsRoundService {
	
	final static Logger logger = Logger.getLogger(GroupsRoundService.class);

	private Session session;

	public GroupsRoundService(Session session) {
		this.session = session;
	}

	public void seedGroupsRoundOf12() {
		logger.info("seed groups round of 12");
		
		SeasonService seasonService = new SeasonService(session);
		Season season = seasonService.loadCurrentSeason();
		
		QualsRound roundQuals2 = (QualsRound) season.getRounds().get(1);
		GroupsRound groupsRoundOf12 = (GroupsRound) season.getRounds().get(2);
		
		// must add winners from roundQuals2
		List<Matchup> matchups = roundQuals2.getMatchups();
		
		List<Team> round2Winners = new ArrayList<>();
		
		for(Matchup matchup : matchups) {
			
			round2Winners.add(matchup.getWinner());
			
		}
		
		groupsRoundOf12.getTeams().addAll(round2Winners);
		
		// TODO seed
		
		
		
		DataAccessObject<GroupsRound> roundDao = new DataAccessObject<>(session);
		roundDao.save(groupsRoundOf12);
		
		Properties properties = PropertyUtils.load();
		properties.setProperty("groups_round_12", "1");
		PropertyUtils.save(properties);
		
	}
	
	
	
}
