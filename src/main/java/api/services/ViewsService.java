package api.services;

import java.text.DecimalFormat;
import java.util.Collections;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;

import org.apache.commons.lang3.math.NumberUtils;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import core.peristence.HibernateUtils;
import core.peristence.dtos.League;
import core.peristence.dtos.Stats;
import core.peristence.dtos.Team;
import core.peristence.dtos.games.Result;
import core.peristence.dtos.groups.Group;
import core.peristence.dtos.groups.Season;
import core.peristence.dtos.rounds.GroupsRound;
import core.peristence.dtos.rounds.PlayoffsRound;
import core.peristence.dtos.rounds.QualsRound;
import core.peristence.dtos.rounds.Round;
import core.services.ServiceUtils;
import core.tools.CoefficientsOrdering;

@Service
public class ViewsService {

	@Autowired
	private SessionFactory sessionFactory;

	@PostConstruct
	public void initIt() {
		HibernateUtils.setSessionFactory(sessionFactory);
	}

	public League getLeague() {
		return ServiceUtils.getLeague();
	}

	public List<Season> getAllSeasons() {
		return ServiceUtils.loadAllSeasons();
	}

	public Season getCurrentSeason() {
		return ServiceUtils.loadCurrentSeason();
	}

	public Season getSeason(int year) {
		return ServiceUtils.loadSeason(year);
	}

	/**
	 * 
	 * @param year
	 *          season number
	 * @param round
	 *          1 for 1st quals round , 2 for 2nd quals round
	 * @return
	 */
	public QualsRound getQualRound(int year, int round) {

		Season season = getSeason(year);
		List<Round> rounds = season.getRounds();
		return (QualsRound) rounds.get(round - 1);

	}

	/**
	 * 
	 * @param year
	 *          season number
	 * @param round
	 *          1 for round of 12, 2 for round of 8
	 * @return
	 */
	public GroupsRound getGroupRound(int year, int round) {

		Season season = getSeason(year);
		List<Round> rounds = season.getRounds();
		return (GroupsRound) rounds.get(round + 1);

	}

	/**
	 * 
	 * @param year
	 *          season number
	 * @return
	 */
	public PlayoffsRound getPlayoffsRound(int year) {

		Season season = getSeason(year);
		List<Round> rounds = season.getRounds();
		return (PlayoffsRound) rounds.get(4);

	}

	public Map<Team, Stats> getTeamsTotalStats() {

		Map<Team, Stats> statsTotal = new LinkedHashMap<>();

		List<Team> teams = ServiceUtils.loadTeams();
		Group master = ServiceUtils.getMasterGroup();

		Collections.sort(teams, new CoefficientsOrdering());

		for (Team team : teams) {
			statsTotal.put(team, team.getStatsForGroup(master));
		}

		return statsTotal;

	}

	public Map<Team, Integer> getTeamsTotalCoefficients() {

		Map<Team, Integer> coeffsTotal = new LinkedHashMap<>();

		List<Team> teams = ServiceUtils.loadTeams();
		Group master = ServiceUtils.getMasterGroup();

		Collections.sort(teams, new CoefficientsOrdering());

		for (Team team : teams) {
			coeffsTotal.put(team, team.getStatsForGroup(master).getPoints());
		}

		return coeffsTotal;

	}

	public Map<String, Object> gameStats() {

		// TODO hacked in the keys as displayed names
		Map<String, Object> gamestats = new LinkedHashMap<>();
		 
		DecimalFormat numberFormat = new DecimalFormat("0.00");
		
		Session session = HibernateUtils.getSession();

		@SuppressWarnings("unchecked")
		List<Result> results = session.createQuery("from RESULTS").list();
		
		gamestats.put("number of games played", results.size() );
		gamestats.put("wins", results.stream().filter(Result::homeTeamWon).count());
		gamestats.put("draws", results.stream().filter(Result::tie).count());
		gamestats.put("losses", results.stream().filter(Result::awayTeamWon).count());
		gamestats.put("avg goals scored", numberFormat.format(results.stream().mapToDouble(Result::getGoalsMadeByHomeTeam).average().getAsDouble()));
		gamestats.put("avg goals conceded", numberFormat.format(results.stream().mapToDouble(Result::getGoalsMadeByAwayTeam).average().getAsDouble()));
		
		return gamestats;
	}
	
}
