package gr.manolis.stelios.footie.core.services;

import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.List;

import javax.transaction.Transactional;

import gr.manolis.stelios.footie.core.Utils;
import org.apache.commons.io.FileUtils;
import org.apache.log4j.Logger;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import gr.manolis.stelios.footie.core.peristence.DataAccessObject;
import gr.manolis.stelios.footie.core.peristence.dtos.League;
import gr.manolis.stelios.footie.core.peristence.dtos.Team;
import gr.manolis.stelios.footie.core.peristence.dtos.groups.Group;

@Service
@Transactional
public class BootService {

	final static Logger logger = Logger.getLogger(BootService.class);

	@Autowired
	private SessionFactory sessionFactory;

	@Autowired
	private ServiceUtils serviceUtils;

	public League loadLeague() {

		League league = serviceUtils.getLeague();

		if (league == null) {

			boolean teamsFileFound = registerTeamsFromFile();
			league = new League();

			if(teamsFileFound) {
				DataAccessObject<League> dao2 = new DataAccessObject<>(sessionFactory.getCurrentSession());
				dao2.save(league);
			}
		}

		return league;
	}

	private boolean registerTeamsFromFile() {

		logger.info("loading teams from file");

		try {

			File file = Utils.getTeamsFile();

			if (!file.exists()) {
				logger.error("teams file not found");
				return false;
			}

			List<String> teams = FileUtils.readLines(file, StandardCharsets.UTF_8);

			DataAccessObject<Team> teamDAO = new DataAccessObject<>(sessionFactory.getCurrentSession());

			for (String tt : teams) {
				String teamName = tt.trim();
				logger.info("adding " + teamName);
				Team team = new Team(teamName);

				teamDAO.save(team);
			}


		} catch (IOException e) {
			e.printStackTrace();
		}

		return true;
	}

}
