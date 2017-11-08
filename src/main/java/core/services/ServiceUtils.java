package core.services;

import java.util.List;
import java.util.Properties;

import core.PropertyUtils;
import core.peristence.DataAccessObject;
import core.peristence.HibernateUtils;
import core.peristence.dtos.Team;
import core.peristence.dtos.groups.Group;
import core.peristence.dtos.groups.Season;

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
	
	public static Season loadSeason(int year) {
		
		return (Season) HibernateUtils.getSession().createQuery("from GROUPS where discriminator='S' and SEASON_YEAR=" + year, Group.class)
				.getSingleResult();
		
	}

	
	public static List<Team> loadTeams() {

		DataAccessObject<Team> dao = new DataAccessObject<>(HibernateUtils.getSession());
		return dao.list("TEAMS");

	}

}
