package gr.manolis.stelios.footie.core.services;

import gr.manolis.stelios.footie.api.services.UIPersistService;
import gr.manolis.stelios.footie.core.Utils;
import gr.manolis.stelios.footie.core.peristence.DataAccessObject;
import gr.manolis.stelios.footie.core.peristence.dtos.Player;
import gr.manolis.stelios.footie.core.peristence.dtos.Team;
import gr.manolis.stelios.footie.core.peristence.dtos.games.Game;
import gr.manolis.stelios.footie.core.peristence.dtos.groups.RobinGroup;
import gr.manolis.stelios.footie.core.peristence.dtos.groups.Season;
import gr.manolis.stelios.footie.core.peristence.dtos.rounds.GroupsRound;
import gr.manolis.stelios.footie.core.peristence.dtos.rounds.QualsRound;
import gr.manolis.stelios.footie.core.peristence.dtos.rounds.Round;
import org.hibernate.Session;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.NumberUtils;

import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@Transactional
public class ServiceUtils {

	@PersistenceContext
    private EntityManager em;

	@Autowired
	private UIPersistService persistService;

	public boolean testDbConnection() {

		final boolean[] works = new boolean[1];


		Session session = em.unwrap(Session.class);
		session.doWork( (c) -> works[0] = true );

		return works[0];
	}

	public Season loadCurrentSeason() {
		return loadSeason(getNumberOfSeasons());
	}

	public Season loadSeason(int year) {
		return (Season) em.unwrap(Session.class)
				.createQuery("from SEASONS where seasonYear=" + year).uniqueResult();
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
		return em.unwrap(Session.class).createQuery("from SEASONS").list();
	}

	@SuppressWarnings("unchecked")
	public int getCoefficientsUntilSeason(Team team, int seasonUntil) {
		return Utils.getCoefficientsUntilSeason(loadAllSeasons(), team, seasonUntil);
	}

	public List<Team> loadTeams() {
		DataAccessObject<Team> dao = new DataAccessObject<>(em.unwrap(Session.class));
		return dao.list("TEAMS");
	}

	// not efficient to write?
	public Team loadTeam(int teamId) {
		List<Team> teams = loadTeams();
		Team team = teams.stream().filter ( t -> t.getId() == teamId).findFirst().get();
		return team;
	}

	public RobinGroup loadRobinGroup(int id) {
		Object group = em.unwrap(Session.class)
				.createQuery("from GROUPS_ROBIN_12 where id=" + id).uniqueResult();
		if (group == null) {
			group = em.unwrap(Session.class)
					.createQuery("from GROUPS_ROBIN_8 where id=" + id).uniqueResult();
		}
		return (RobinGroup) group;
	}

	public Game loadGame(int id) {
		return (Game) em.unwrap(Session.class).createQuery("from GAMES where id=" + id).uniqueResult();
	}

	public QualsRound getQualRound(Season season, int round) {
		List<Round> rounds = season.getRounds();
		return (QualsRound) rounds.get(round);
	}
	
	public GroupsRound getGroupsRound(Season season, int round) {
		List<Round> rounds = season.getRounds();
		return (GroupsRound) rounds.get(round + 2);
	}

	public List<Player> loadPlayers() {
		DataAccessObject<Player> dao = new DataAccessObject<>(em.unwrap(Session.class));
		return dao.list("PLAYERS");
	}

	public Player loadPlayer(int id) {
		List<Player> players = loadPlayers();
		Player player = players.stream().filter ( t -> t.getId() == id).findFirst().get();
		return player;

	}
}

