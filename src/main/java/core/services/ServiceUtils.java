package core.services;

import java.util.List;

import javax.transaction.Transactional;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import core.peristence.DataAccessObject;
import core.peristence.dtos.League;
import core.peristence.dtos.Team;
import core.peristence.dtos.groups.Group;
import core.peristence.dtos.groups.Season;


@Service
@Transactional
public class ServiceUtils {

	@Autowired
	private SessionFactory sessionFactory;
	
	public League getLeague() {

		DataAccessObject<League> groupDao = new DataAccessObject<>(sessionFactory.getCurrentSession());

		List<League> ls = groupDao.list("LEAGUES");

		return ls.size() > 0 ? groupDao.list("LEAGUES").get(0) : null;

	}

	public Group getMasterGroup() {

		DataAccessObject<Group> groupDao = new DataAccessObject<>(sessionFactory.getCurrentSession());
		return groupDao.listByField("GROUPS", "NAME", "master").get(0);

	}

	public Season loadCurrentSeason() {

		League league = getLeague();

		DataAccessObject<Season> dao = new DataAccessObject<>(sessionFactory.getCurrentSession());

		return dao.listByField("GROUPS", "SEASON_YEAR", "" + league.getSeasonNum()).get(0);

	}

	public Season loadSeason(int year) {

		return (Season) sessionFactory.getCurrentSession()
				.createQuery("from GROUPS where discriminator='S' and SEASON_YEAR=" + year).uniqueResult();

	}

	@SuppressWarnings("unchecked")
	public List<Season> loadAllSeasons() {

		return sessionFactory.getCurrentSession().createQuery("from GROUPS where discriminator='S' ").list();

	}

	public List<Team> loadTeams() {

		DataAccessObject<Team> dao = new DataAccessObject<>(sessionFactory.getCurrentSession());
		return dao.list("TEAMS");

	}

}
