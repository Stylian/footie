package main.java.services;

import java.util.Properties;

import org.hibernate.Session;

import main.java.DataAccessObject;
import main.java.PropertyUtils;
import main.java.dtos.groups.Group;
import main.java.dtos.groups.Season;

public class ServiceUtils {

	public static Group getMasterGroup(Session session) {
		
		DataAccessObject<Group> groupDao = new DataAccessObject<>(session);
		return groupDao.listByField("GROUPS", "NAME", "master").get(0);
		
	}

	public static Season loadCurrentSeason(Session session) {

		Properties properties = PropertyUtils.load();
		String strSeasonNum = properties.getProperty("season");

		DataAccessObject<Season> dao = new DataAccessObject<>(session);
		
		return dao.listByField("GROUPS", "SEASON_YEAR", strSeasonNum).get(0);

	}
	
}
