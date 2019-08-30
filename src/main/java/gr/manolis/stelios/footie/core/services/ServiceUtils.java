package gr.manolis.stelios.footie.core.services;

import gr.manolis.stelios.footie.api.services.UIPersistService;
import gr.manolis.stelios.footie.core.Utils;
import gr.manolis.stelios.footie.core.peristence.DataAccessObject;
import gr.manolis.stelios.footie.core.peristence.dtos.Team;
import gr.manolis.stelios.footie.core.peristence.dtos.games.Game;
import gr.manolis.stelios.footie.core.peristence.dtos.groups.RobinGroup;
import gr.manolis.stelios.footie.core.peristence.dtos.groups.Season;
import gr.manolis.stelios.footie.core.peristence.dtos.rounds.GroupsRound;
import gr.manolis.stelios.footie.core.peristence.dtos.rounds.QualsRound;
import gr.manolis.stelios.footie.core.peristence.dtos.rounds.Round;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.NumberUtils;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class ServiceUtils {

	@Autowired
	private SessionFactory sessionFactory;

	@Autowired
	private UIPersistService persistService;

	public boolean testDbConnection() {

		final boolean[] works = new boolean[1];

		Session session = sessionFactory.getCurrentSession();
		session.doWork( (c) -> works[0] = true );

		return works[0];
	}

	public Season loadCurrentSeason() {
		DataAccessObject<Season> dao = new DataAccessObject<>(sessionFactory.getCurrentSession());
		return dao.listByField("SEASONS", "SEASON_YEAR", "" + getNumberOfSeasons()).get(0);
	}

	public Season loadSeason(int year) {

		return (Season) sessionFactory.getCurrentSession()
				.createQuery("from SEASONS where SEASON_YEAR=" + year).uniqueResult();

	}

	public int getNumberOfSeasons() {
		String strSeasonNum = persistService.getPropertyValue("seasonNum");
		int seasonNum = 0;
		if(strSeasonNum != null) {
			seasonNum = Integer.parseInt(strSeasonNum);
		}
		return seasonNum;
	}
	
	@SuppressWarnings("unchecked")
	public List<Season> loadAllSeasons() {
		return sessionFactory.getCurrentSession().createQuery("from SEASONS").list();
	}

	@SuppressWarnings("unchecked")
	public int getCoefficientsUntilSeason(Team team, int seasonUntil) {
		return Utils.getCoefficientsUntilSeason(loadAllSeasons(), team, seasonUntil);
	}

	public List<Team> loadTeams() {
		DataAccessObject<Team> dao = new DataAccessObject<>(sessionFactory.getCurrentSession());
		return dao.list("TEAMS");
	}

	public RobinGroup loadRobinGroup(int id) {
		Object group = sessionFactory.getCurrentSession()
				.createQuery("from GROUPS_ROBIN_12 where ID=" + id).uniqueResult();
		if (group == null) {
			group = sessionFactory.getCurrentSession()
					.createQuery("from GROUPS_ROBIN_8 where ID=" + id).uniqueResult();
		}
		return (RobinGroup) group;
	}

	public Game loadGame(int id) {
		return (Game) sessionFactory.getCurrentSession().createQuery("from GAMES where ID=" + id).uniqueResult();
	}

	public QualsRound getQualRound(Season season, int round) {
		List<Round> rounds = season.getRounds();
		return (QualsRound) rounds.get(round);
	}
	
	public GroupsRound getGroupsRound(Season season, int round) {
		List<Round> rounds = season.getRounds();
		return (GroupsRound) rounds.get(round + 2);
	}

}
