package main.java.services;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Properties;

import org.apache.log4j.Logger;
import org.hibernate.Session;

import main.java.DataAccessObject;
import main.java.PropertyUtils;
import main.java.Utils;
import main.java.dtos.Matchup;
import main.java.dtos.Team;
import main.java.dtos.groups.RobinGroup12;
import main.java.dtos.groups.Season;
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
		
		Season season = ServiceUtils.loadCurrentSeason(session);
		
		GroupsRound groupsRoundOf12 = (GroupsRound) season.getRounds().get(2);
		
		// must add winners from roundQuals2
		QualsRound roundQuals2 = (QualsRound) season.getRounds().get(1);
		List<Matchup> matchups = roundQuals2.getMatchups();
		List<Team> round2Winners = new ArrayList<>();
		
		for(Matchup matchup : matchups) {
			
			round2Winners.add(matchup.getWinner());
			
		}
		
		groupsRoundOf12.getTeams().addAll(round2Winners);
		
		logger.info("groups round participants: " + Utils.toString(groupsRoundOf12.getTeams()));
		
		List<Team> strongTeams = new ArrayList<>();
		List<Team> mediumTeams = new ArrayList<>();
		List<Team> weakTeams = new ArrayList<>();		
		
		if(season.getSeasonYear() == 1) {
			
			List<Team> teamsCopy = new ArrayList<>(groupsRoundOf12.getTeams());
			
			Collections.shuffle(teamsCopy);
			
			while(!teamsCopy.isEmpty()) {
				
				strongTeams.add(teamsCopy.remove(0));
				mediumTeams.add(teamsCopy.remove(0));
				weakTeams.add(teamsCopy.remove(0));
				
			}
			
		}else {
			
			// TODO
			
		}
		
		logger.info("strong: " + Utils.toString(strongTeams));
		logger.info("medium: " + Utils.toString(mediumTeams));
		logger.info("weak: " + Utils.toString(weakTeams));
		
		groupsRoundOf12.setStrongTeams(strongTeams);
		groupsRoundOf12.setMediumTeams(mediumTeams);
		groupsRoundOf12.setWeakTeams(weakTeams);
		
		DataAccessObject<GroupsRound> roundDao = new DataAccessObject<>(session);
		roundDao.save(groupsRoundOf12);
		
		Properties properties = PropertyUtils.load();
		properties.setProperty("groups_round_12", "1");
		PropertyUtils.save(properties);
		
	}
	
	public void setUpGroupsRoundOf12() {
		logger.info("set up groups round of 12");
		
		Season season = ServiceUtils.loadCurrentSeason(session);
		
		GroupsRound groupsRoundOf12 = (GroupsRound) season.getRounds().get(2);
		
		List<Team> strongTeams = groupsRoundOf12.getStrongTeams();
		List<Team> mediumTeams = groupsRoundOf12.getMediumTeams();
		List<Team> weakTeams = groupsRoundOf12.getWeakTeams();
		
		Collections.shuffle(strongTeams);
		Collections.shuffle(mediumTeams);
		Collections.shuffle(weakTeams);
		
		// create groups and add teams
		RobinGroup12 groupA = new RobinGroup12("GROUP A");
		groupA.addTeam(strongTeams.get(0));
		groupA.addTeam(mediumTeams.get(0));
		groupA.addTeam(weakTeams.get(0));
		groupA.buildGames();

		RobinGroup12 groupB = new RobinGroup12("GROUP B");
		groupB.addTeam(strongTeams.get(1));
		groupB.addTeam(mediumTeams.get(1));
		groupB.addTeam(weakTeams.get(1));
		groupB.buildGames();
		
		RobinGroup12 groupC = new RobinGroup12("GROUP C");
		groupC.addTeam(strongTeams.get(2));
		groupC.addTeam(mediumTeams.get(2));
		groupC.addTeam(weakTeams.get(2));
		groupC.buildGames();
		
		RobinGroup12 groupD = new RobinGroup12("GROUP D");
		groupD.addTeam(strongTeams.get(3));
		groupD.addTeam(mediumTeams.get(3));
		groupD.addTeam(weakTeams.get(3));
		groupD.buildGames();
		
		groupsRoundOf12.addGroup(groupA);
		groupsRoundOf12.addGroup(groupB);
		groupsRoundOf12.addGroup(groupC);
		groupsRoundOf12.addGroup(groupD);
		
		logger.info(groupA);
		logger.info(groupB);
		logger.info(groupC);
		logger.info(groupD);
		
		DataAccessObject<GroupsRound> roundDao = new DataAccessObject<>(session);
		roundDao.save(groupsRoundOf12);
		
		Properties properties = PropertyUtils.load();
		properties.setProperty("groups_round_12", "2");
		PropertyUtils.save(properties);
		
	}
	
}
