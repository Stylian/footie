package main.java.service.services;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Properties;

import org.apache.log4j.Logger;
import org.hibernate.Session;

import main.java.service.PropertyUtils;
import main.java.service.Utils;
import main.java.service.peristence.DataAccessObject;
import main.java.service.peristence.HibernateUtils;
import main.java.service.peristence.dtos.Stats;
import main.java.service.peristence.dtos.Team;
import main.java.service.peristence.dtos.groups.RobinGroup;
import main.java.service.peristence.dtos.groups.RobinGroup12;
import main.java.service.peristence.dtos.groups.RobinGroup8;
import main.java.service.peristence.dtos.groups.Season;
import main.java.service.peristence.dtos.matchups.Matchup;
import main.java.service.peristence.dtos.rounds.GroupsRound;
import main.java.service.peristence.dtos.rounds.QualsRound;
import main.java.service.tools.CoefficientsOrdering;

public class GroupsRoundService {
	
	final static Logger logger = Logger.getLogger(GroupsRoundService.class);

	private Session session = HibernateUtils.getSession();

	public void seedGroupsRoundOf12() {
		logger.info("seed groups round of 12");
		
		Season season = ServiceUtils.loadCurrentSeason();
		
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
		
		List<Team> teamsCopy = new ArrayList<>(groupsRoundOf12.getTeams());

		if(season.getSeasonYear() == 1) {
			
			
			Collections.shuffle(teamsCopy);
			
			while(!teamsCopy.isEmpty()) {
				
				strongTeams.add(teamsCopy.remove(0));
				mediumTeams.add(teamsCopy.remove(0));
				weakTeams.add(teamsCopy.remove(0));
				
			}
			
		}else {
			
			strongTeams.add(teamsCopy.remove(0)); // the champion
			
			Collections.sort(teamsCopy, new CoefficientsOrdering());
			
			for(int i=0; i<3; i++) {
				strongTeams.add(teamsCopy.remove(0));
			}
			
			for(int i=0; i<4; i++) {
				mediumTeams.add(teamsCopy.remove(0));
			}
			
			weakTeams = teamsCopy;
			
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
		
		Season season = ServiceUtils.loadCurrentSeason();
		
		GroupsRound groupsRoundOf12 = (GroupsRound) season.getRounds().get(2);
		
		List<Team> strongTeams = groupsRoundOf12.getStrongTeams();
		List<Team> mediumTeams = groupsRoundOf12.getMediumTeams();
		List<Team> weakTeams = groupsRoundOf12.getWeakTeams();
		
		Collections.shuffle(strongTeams);
		Collections.shuffle(mediumTeams);
		Collections.shuffle(weakTeams);
		
		// create groups and add teams and games
		RobinGroup groupA = new RobinGroup12("GROUP A");
		groupA.addTeam(strongTeams.get(0));
		groupA.addTeam(mediumTeams.get(0));
		groupA.addTeam(weakTeams.get(0));
		groupA.buildGames();

		RobinGroup groupB = new RobinGroup12("GROUP B");
		groupB.addTeam(strongTeams.get(1));
		groupB.addTeam(mediumTeams.get(1));
		groupB.addTeam(weakTeams.get(1));
		groupB.buildGames();
		
		RobinGroup groupC = new RobinGroup12("GROUP C");
		groupC.addTeam(strongTeams.get(2));
		groupC.addTeam(mediumTeams.get(2));
		groupC.addTeam(weakTeams.get(2));
		groupC.buildGames();
		
		RobinGroup groupD = new RobinGroup12("GROUP D");
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

	public void seedAndSetGroupsRoundOf8() {
		logger.info("seed and set groups round of 8");
		
		Season season = ServiceUtils.loadCurrentSeason();
		
		// must add winners from groups round of 12
		GroupsRound groupsRoundOf12 = (GroupsRound) season.getRounds().get(2);
		RobinGroup r12gA = groupsRoundOf12.getGroups().get(0);
		RobinGroup r12gB = groupsRoundOf12.getGroups().get(1);
		RobinGroup r12gC = groupsRoundOf12.getGroups().get(2);
		RobinGroup r12gD = groupsRoundOf12.getGroups().get(3);
		
		// create groups and add teams and games
		RobinGroup groupA = new RobinGroup8("GROUP A");
		groupA.addTeam(r12gA.getTeamsOrdered().get(0));
		groupA.addTeam(r12gA.getTeamsOrdered().get(1));
		groupA.addTeam(r12gB.getTeamsOrdered().get(0));
		groupA.addTeam(r12gB.getTeamsOrdered().get(1));
		groupA.buildGames();

		RobinGroup groupB = new RobinGroup8("GROUP B");
		groupB.addTeam(r12gC.getTeamsOrdered().get(0));
		groupB.addTeam(r12gC.getTeamsOrdered().get(1));
		groupB.addTeam(r12gD.getTeamsOrdered().get(0));
		groupB.addTeam(r12gD.getTeamsOrdered().get(1));
		groupB.buildGames();
		
		// build round of 8
		GroupsRound groupsRoundOf8 = new GroupsRound(season, "Groups Round of 8");
		groupsRoundOf8.addGroup(groupA);
		groupsRoundOf8.addGroup(groupB);
		
		// add stats from round of 12
		for(RobinGroup group : groupsRoundOf8.getGroups()) {
			
			for(Team team : group.getTeams()) {

				Stats stats12 = getStatsFromRoundOf12(groupsRoundOf12, team);
				
				team.getStatsForGroup(group).addStats(stats12);
				
			}
			
		}
		
		logger.info(groupA);
		logger.info(groupB);
		
		DataAccessObject<GroupsRound> roundDao = new DataAccessObject<>(session);
		roundDao.save(groupsRoundOf8);
		
		Properties properties = PropertyUtils.load();
		properties.setProperty("groups_round_8", "2");
		PropertyUtils.save(properties);
		
	}

	private Stats getStatsFromRoundOf12(GroupsRound groupsRoundOf12, Team team) {

		//iterate through groups to find the team
		for(RobinGroup group : groupsRoundOf12.getGroups()) {
			
			for(Team t : group.getTeams()) {
				
				// found team
				if(t.equals(team)) {
					
					return t.getStatsForGroup(group);
					
				}
				
			}
			
		}
		
		// should never reach
		return null;
		
	}
	
}
