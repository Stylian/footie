package gr.manolis.stelios.footie.api.controllers;


import gr.manolis.stelios.footie.api.services.UIPersistService;
import gr.manolis.stelios.footie.api.services.ViewsService;
import gr.manolis.stelios.footie.core.peristence.dtos.groups.Season;
import gr.manolis.stelios.footie.core.services.ServiceUtils;
import org.apache.commons.io.FileUtils;
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
import java.util.Calendar;
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
    private UIPersistService persistService;

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

    @PostMapping("/restore_point")
    public String saveRestorePoint() {

        DateFormat dateFormat = new SimpleDateFormat("yyyy_MM_dd_HH_mm_ss");
        Date date = new Date();
        String strDate = dateFormat.format(date);

        File dataFolder = new File( "./data");
        File backupFolder = new File("./backups/data_" + strDate);

        try {
            FileUtils.copyDirectory(dataFolder, backupFolder);
            persistService.setPropertyValue("backupDatabase", backupFolder.getName());

        } catch (IOException e) {
            e.printStackTrace();
        }

        return backupFolder.getName();
    }

}