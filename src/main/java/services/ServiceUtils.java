package main.java.services;

import java.util.List;
import java.util.Properties;

import org.hibernate.Session;

import main.java.DataAccessObject;
import main.java.HibernateUtils;
import main.java.PropertyUtils;
import main.java.dtos.Team;
import main.java.dtos.groups.Group;
import main.java.dtos.groups.Season;

public class ServiceUtils {

	public static Group getMasterGroup() {

		DataAccessObject<Group> groupDao = new DataAccessObject<>(HibernateUtils.getSession());
		return groupDao.listByField("GROUPS", "NAME", "master").get(0);

	}

	public static Season loadCurrentSeason() {

		Properties properties = PropertyUtils.load();
		String strSeasonNum = properties.getProperty("season");

		DataAccessObject<Season> dao = new DataAccessObject<>(HibernateUtils.getSession());

		return dao.listByField("GROUPS", "SEASON_YEAR", strSeasonNum).get(0);

	}

	public static List<Team> loadTeams() {

		DataAccessObject<Team> dao = new DataAccessObject<>(HibernateUtils.getSession());
		return dao.list("TEAMS");

	}

}
