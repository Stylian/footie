package gr.manolis.stelios.footie.api.controllers;


import gr.manolis.stelios.footie.api.services.UIPersistService;
import gr.manolis.stelios.footie.api.services.ViewsService;
import gr.manolis.stelios.footie.core.Rules;
import gr.manolis.stelios.footie.core.Utils;
import gr.manolis.stelios.footie.core.peristence.DataAccessObject;
import gr.manolis.stelios.footie.core.peristence.dtos.Stage;
import gr.manolis.stelios.footie.core.peristence.dtos.Team;
import gr.manolis.stelios.footie.core.peristence.dtos.groups.Season;
import gr.manolis.stelios.footie.core.peristence.dtos.matchups.Matchup;
import gr.manolis.stelios.footie.core.peristence.dtos.rounds.PlayoffsRound;
import gr.manolis.stelios.footie.core.peristence.dtos.rounds.QualsRound;
import gr.manolis.stelios.footie.core.peristence.dtos.rounds.Round;
import gr.manolis.stelios.footie.core.services.GroupsRoundService;
import gr.manolis.stelios.footie.core.services.ServiceUtils;
import org.apache.commons.io.FileUtils;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.transaction.Transactional;
import java.io.File;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

@RestController
@Transactional
@RequestMapping("/rest/admin")
public class RestAdminController {

    @Autowired
    private ViewsService viewsService;

    @Autowired
    private ServiceUtils serviceUtils;

    @Autowired
    private SessionFactory sessionFactory;

    @Autowired
    private UIPersistService persistService;

    @Autowired
    private GroupsRoundService groupsRoundService;

    @RequestMapping("/general_data")
    public Map<String, Object> generalData() {
        return viewsService.generalData();
    }

    @RequestMapping("/game_stats")
    public Map<String, Object> gameStats() {
        return viewsService.gameStats();
    }


    @RequestMapping("/stages")
    public Season gameStages() {
        return serviceUtils.loadCurrentSeason();
    }

    @GetMapping("/restore_point")
    public String getRestorePoint() {

        return persistService.getPropertyValue("backupDatabase");
    }

    @PostMapping("/reset_tabs")
    public String resetTabs() {
        persistService.resetTabNumbers();
        return "done";
    }

    @PostMapping("/recalculate_elo")
    public String recalculateElo() {


        return "done";
    }

    @PostMapping("/recalculate_coeffs")
    public String recalculateCoeffs() {

        Season season = serviceUtils.loadCurrentSeason();

        // clear coeffs
        for(Team team : season.getTeams()) {
            team.getStatsForGroup(season).setPoints(0);
        }

        QualsRound prelim = (QualsRound) season.getRounds().get(0);
        if(season.getSeasonYear() != 1) {
            if(prelim.getStage().equals(Stage.FINISHED)) {
                for (Matchup matchup : prelim.getMatchups()) {
                    Utils.addGamePointsForMatchup(season, matchup);
                }
            }
        }

        QualsRound roundQuals1 = (QualsRound) season.getRounds().get(1);
        if(roundQuals1.getStage().equals(Stage.FINISHED)) {
            for (Matchup matchup : roundQuals1.getMatchups()) {
                matchup.getWinner().getStatsForGroup(season).addPoints(Rules.PROMOTION_POINTS_QUALS_1);
                Utils.addGamePointsForMatchup(season, matchup);
            }
        }

        QualsRound roundQuals2 = (QualsRound) season.getRounds().get(2);
        if(roundQuals2.getStage().equals(Stage.FINISHED)) {
            for (Matchup matchup : roundQuals2.getMatchups()) {
                matchup.getWinner().getStatsForGroup(season).addPoints(Rules.PROMOTION_POINTS_QUALS_2);
                Utils.addGamePointsForMatchup(season, matchup);
            }
        }

        if(season.getRounds().get(3).getStage().equals(Stage.FINISHED)) {
            groupsRoundService.calcCoeffsForGroup(1, season);
        }

        if(season.getRounds().get(4).getStage().equals(Stage.FINISHED)) {
            groupsRoundService.calcCoeffsForGroup(2, season);
        }

        PlayoffsRound playoffsRound = (PlayoffsRound) season.getRounds().get(5);

        for (Matchup matchup : playoffsRound.getQuarterMatchups()) {
            if(matchup.getWinner() != null) {
                Utils.addGamePointsForMatchup(season, matchup, false);
            }
        }

        for (Matchup matchup : playoffsRound.getSemisMatchups()) {
            if(matchup.getWinner() != null) {
                Utils.addGamePointsForMatchup(season, matchup, true);
            }
        }

        Matchup finalsMatchup = playoffsRound.getFinalsMatchup();
        if(finalsMatchup.getWinner() != null) {
            finalsMatchup.getWinner().getStatsForGroup(season).addPoints(Rules.POINTS_WINNING_THE_LEAGUE);
            if (!finalsMatchup.getTeamHome().equals(finalsMatchup.getWinner())) {
                finalsMatchup.getTeamHome().getStatsForGroup(season).addPoints(Rules.PROMOTION_TO_FINAL);
            } else {
                finalsMatchup.getTeamAway().getStatsForGroup(season).addPoints(Rules.PROMOTION_TO_FINAL);
            }
            // average out points per matchup
            Utils.addGamePointsForMatchup(season, finalsMatchup, true);
        }

        //save
        DataAccessObject<Season> seasonDao = new DataAccessObject<>(sessionFactory.getCurrentSession());
        seasonDao.save(season);

        return "done";
    }

    @PostMapping("/restore_point")
    public String saveRestorePoint() {

        DateFormat dateFormat = new SimpleDateFormat("yyyy_MM_dd_HH_mm_ss");
        Date date = new Date();
        String strDate = dateFormat.format(date);

        File dataFolder = Utils.getDatabaseFile();
        File backupFolder = new File(Utils.getBackupsFolderPath() + "data_" + strDate);

        try {
            FileUtils.copyDirectory(dataFolder, backupFolder);
            persistService.setPropertyValue("backupDatabase", backupFolder.getName());

        } catch (IOException e) {
            e.printStackTrace();
        }

        return backupFolder.getName();
    }

}