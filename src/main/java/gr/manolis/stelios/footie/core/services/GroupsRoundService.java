package gr.manolis.stelios.footie.core.services;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import javax.transaction.Transactional;

import gr.manolis.stelios.footie.core.Rules;
import gr.manolis.stelios.footie.core.peristence.dtos.games.GroupGame;
import gr.manolis.stelios.footie.core.peristence.dtos.groups.*;
import gr.manolis.stelios.footie.core.tools.CoefficientsRangeOrdering;
import org.apache.log4j.Logger;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import gr.manolis.stelios.footie.core.Utils;
import gr.manolis.stelios.footie.core.peristence.DataAccessObject;
import gr.manolis.stelios.footie.core.peristence.dtos.Stage;
import gr.manolis.stelios.footie.core.peristence.dtos.Stats;
import gr.manolis.stelios.footie.core.peristence.dtos.Team;
import gr.manolis.stelios.footie.core.peristence.dtos.matchups.Matchup;
import gr.manolis.stelios.footie.core.peristence.dtos.rounds.GroupsRound;
import gr.manolis.stelios.footie.core.peristence.dtos.rounds.QualsRound;
import gr.manolis.stelios.footie.core.tools.CoefficientsOrdering;

@Service
@Transactional
public class GroupsRoundService {

    final static Logger logger = Logger.getLogger(GroupsRoundService.class);

    @Autowired
    private SessionFactory sessionFactory;

    @Autowired
    private ServiceUtils serviceUtils;

    public GroupsRound seedGroupsRoundOf12() {
        logger.info("seed groups round of 12");

        Season season = serviceUtils.loadCurrentSeason();

        GroupsRound groupsRoundOf12 = (GroupsRound) season.getRounds().get(2);

        // must add winners from roundQuals2
        QualsRound roundQuals2 = (QualsRound) season.getRounds().get(1);
        List<Matchup> matchups = roundQuals2.getMatchups();
        List<Team> round2Winners = new ArrayList<>();

        for (Matchup matchup : matchups) {

            round2Winners.add(matchup.getWinner());

        }

        groupsRoundOf12.getTeams().addAll(round2Winners);

        logger.info("groups round participants: " + Utils.toString(groupsRoundOf12.getTeams()));

        List<Team> strongTeams = new ArrayList<>();
        List<Team> mediumTeams = new ArrayList<>();
        List<Team> weakTeams = new ArrayList<>();

        List<Team> teamsCopy = new ArrayList<>(groupsRoundOf12.getTeams());

        if (season.getSeasonYear() == 1) {

            Collections.shuffle(teamsCopy);

            while (!teamsCopy.isEmpty()) {

                strongTeams.add(teamsCopy.remove(0));
                mediumTeams.add(teamsCopy.remove(0));
                weakTeams.add(teamsCopy.remove(0));

            }

        } else {

            strongTeams.add(teamsCopy.remove(0)); // the champion

            if(season.getSeasonYear() > 1) {
                List<Season> seasonsPast = serviceUtils.loadAllSeasons().subList(0, season.getSeasonYear()-1);
                Collections.sort(teamsCopy, new CoefficientsRangeOrdering(seasonsPast));
            }


            for (int i = 0; i < 3; i++) {
                strongTeams.add(teamsCopy.remove(0));
            }

            for (int i = 0; i < 4; i++) {
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

        roundQuals2.setStage(Stage.FINISHED);
        groupsRoundOf12.setStage(Stage.ON_PREVIEW);

        DataAccessObject<Season> dao = new DataAccessObject<>(sessionFactory.getCurrentSession());
        dao.save(season);

        return groupsRoundOf12;
    }

    public GroupsRound setUpGroupsRoundOf12() {
        logger.info("set up groups round of 12");

        Season season = serviceUtils.loadCurrentSeason();

        GroupsRound groupsRoundOf12 = (GroupsRound) season.getRounds().get(2);

        List<Team> strongTeams = groupsRoundOf12.getStrongTeams();
        List<Team> mediumTeams = groupsRoundOf12.getMediumTeams();
        List<Team> weakTeams = groupsRoundOf12.getWeakTeams();

        Collections.shuffle(strongTeams);
        Collections.shuffle(mediumTeams);
        Collections.shuffle(weakTeams);

        // create groups and add teams and games
        RobinGroup groupA = new RobinGroup12("Group A");
        groupA.addTeam(strongTeams.get(0));
        groupA.addTeam(mediumTeams.get(0));
        groupA.addTeam(weakTeams.get(0));
        groupA.buildGames();

        RobinGroup groupB = new RobinGroup12("Group B");
        groupB.addTeam(strongTeams.get(1));
        groupB.addTeam(mediumTeams.get(1));
        groupB.addTeam(weakTeams.get(1));
        groupB.buildGames();

        RobinGroup groupC = new RobinGroup12("Group C");
        groupC.addTeam(strongTeams.get(2));
        groupC.addTeam(mediumTeams.get(2));
        groupC.addTeam(weakTeams.get(2));
        groupC.buildGames();

        RobinGroup groupD = new RobinGroup12("Group D");
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

        groupsRoundOf12.setStage(Stage.PLAYING);

        DataAccessObject<Season> dao = new DataAccessObject<>(sessionFactory.getCurrentSession());
        dao.save(season);

        return groupsRoundOf12;
    }

    public GroupsRound seedAndSetGroupsRoundOf8() {
        logger.info("seed and set groups round of 8");

        Season season = serviceUtils.loadCurrentSeason();

        // must add winners from groups round of 12
        GroupsRound groupsRoundOf12 = (GroupsRound) season.getRounds().get(2);
        RobinGroup r12gA = groupsRoundOf12.getGroups().get(0);
        RobinGroup r12gB = groupsRoundOf12.getGroups().get(1);
        RobinGroup r12gC = groupsRoundOf12.getGroups().get(2);
        RobinGroup r12gD = groupsRoundOf12.getGroups().get(3);

        // create groups and add teams and games
        RobinGroup groupA = new RobinGroup8("GROUP A");
        groupA.addTeam(r12gA.getTeams().get(0));
        groupA.addTeam(r12gA.getTeams().get(1));
        groupA.addTeam(r12gB.getTeams().get(0));
        groupA.addTeam(r12gB.getTeams().get(1));
        groupA.buildGames();

        RobinGroup groupB = new RobinGroup8("GROUP B");
        groupB.addTeam(r12gC.getTeams().get(0));
        groupB.addTeam(r12gC.getTeams().get(1));
        groupB.addTeam(r12gD.getTeams().get(0));
        groupB.addTeam(r12gD.getTeams().get(1));
        groupB.buildGames();

        // build round of 8
        GroupsRound groupsRoundOf8 = new GroupsRound(season, "groups2", 4);
        groupsRoundOf8.addGroup(groupA);
        groupsRoundOf8.addGroup(groupB);

        // add stats from round of 12
        for (RobinGroup group : groupsRoundOf8.getGroups()) {

            for (Team team : group.getTeams()) {

                Stats stats12 = getStatsFromRoundOf12(groupsRoundOf12, team);

                team.getStatsForGroup(group).addStats(stats12);

            }

        }

        logger.info(groupA);
        logger.info(groupB);

        groupsRoundOf8.setStage(Stage.PLAYING);
        groupsRoundOf12.setStage(Stage.FINISHED);

        DataAccessObject<Season> dao = new DataAccessObject<>(sessionFactory.getCurrentSession());
        dao.save(season);

        return groupsRoundOf8;

    }

    private Stats getStatsFromRoundOf12(GroupsRound groupsRoundOf12, Team team) {

        // iterate through groups to find the team
        for (RobinGroup group : groupsRoundOf12.getGroups()) {

            for (Team t : group.getTeams()) {

                // found team
                if (t.equals(team)) {

                    return t.getStatsForGroup(group);

                }

            }

        }

        // should never reach
        return null;

    }


    public void endGroupsRound(String strRound) {
        logger.info("ending groups round: " + strRound);
        int round = Integer.parseInt(strRound);

        Season season = serviceUtils.loadCurrentSeason();

        switch(round) {
            case 1:
                // add coeffs for groups12 positions
                GroupsRound groupsOf12Round = (GroupsRound) season.getRounds().get(2);
                for (RobinGroup robinGroup : groupsOf12Round.getGroups()) {
                    robinGroup.getTeams().get(0).getStatsForGroup(season).addPoints(Rules.POINTS_GROUP12_1ST_PLACE);
                    robinGroup.getTeams().get(1).getStatsForGroup(season).addPoints(Rules.POINTS_GROUP12_2ND_PLACE);

                    for (GroupGame groupGame : robinGroup.getGames()) {
                        Team homeTeam = groupGame.getHomeTeam();
                        if (groupGame.getResult().homeTeamWon()) {
                            homeTeam.getStatsForGroup(season).addPoints(Rules.WIN_POINTS);
                        } else if (groupGame.getResult().tie()) {
                            homeTeam.getStatsForGroup(season).addPoints(Rules.DRAW_POINTS);
                        }
                    }

                }
                break;
            case 2:
                // add coeffs for groups8 positions
                GroupsRound groupsOf8Round = (GroupsRound) season.getRounds().get(3);
                for (RobinGroup robinGroup : groupsOf8Round.getGroups()) {
                    robinGroup.getTeams().get(0).getStatsForGroup(season).addPoints(Rules.POINTS_GROUP8_1ST_PLACE);
                    robinGroup.getTeams().get(1).getStatsForGroup(season).addPoints(Rules.POINTS_GROUP8_2ND_PLACE);
                    robinGroup.getTeams().get(2).getStatsForGroup(season).addPoints(Rules.POINTS_GROUP8_3RD_PLACE);

                    for (GroupGame groupGame : robinGroup.getGames()) {
                        Team homeTeam = groupGame.getHomeTeam();
                        if (groupGame.getResult().homeTeamWon()) {
                            homeTeam.getStatsForGroup(season).addPoints(Rules.WIN_POINTS);
                        } else if (groupGame.getResult().tie()) {
                            homeTeam.getStatsForGroup(season).addPoints(Rules.DRAW_POINTS);
                        }
                    }
                }
                break;
        }

        //save
        DataAccessObject<Season> seasonDao = new DataAccessObject<>(sessionFactory.getCurrentSession());
        seasonDao.save(season);

    }


}
