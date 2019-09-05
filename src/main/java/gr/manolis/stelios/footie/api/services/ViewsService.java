package gr.manolis.stelios.footie.api.services;

import gr.manolis.stelios.footie.api.dtos.TeamCoeffsDTO;
import gr.manolis.stelios.footie.api.mappers.TeamCoeffsMapper;
import gr.manolis.stelios.footie.core.Utils;
import gr.manolis.stelios.footie.core.peristence.dtos.Seed;
import gr.manolis.stelios.footie.core.peristence.dtos.Stats;
import gr.manolis.stelios.footie.core.peristence.dtos.Team;
import gr.manolis.stelios.footie.core.peristence.dtos.games.Result;
import gr.manolis.stelios.footie.core.peristence.dtos.groups.Season;
import gr.manolis.stelios.footie.core.peristence.dtos.rounds.GroupsRound;
import gr.manolis.stelios.footie.core.peristence.dtos.rounds.PlayoffsRound;
import gr.manolis.stelios.footie.core.peristence.dtos.rounds.Round;
import gr.manolis.stelios.footie.core.services.ServiceUtils;
import gr.manolis.stelios.footie.core.tools.CoefficientsRangeOrdering;
import org.apache.commons.math3.util.Precision;
import org.apache.log4j.Logger;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.text.DecimalFormat;
import java.util.*;

@Service
@Transactional
public class ViewsService {

	final static Logger logger = Logger.getLogger(ViewsService.class);

	@Autowired
	private SessionFactory sessionFactory;

	@Autowired
	private ServiceUtils serviceUtils;

    @Autowired
    private TeamCoeffsMapper teamCoeffsMapper;

	public List<Season> getAllSeasons() {
		return serviceUtils.loadAllSeasons();
	}

	public Season getCurrentSeason() {
		return serviceUtils.loadCurrentSeason();
	}

	public Season getSeason(int year) {
		return serviceUtils.loadSeason(year);
	}

	/**
	 * 
	 * @param year
	 *            season number
	 * @param round
	 *            1 for round of 12, 2 for round of 8
	 * @return
	 */
	public GroupsRound getGroupRound(int year, int round) {

		Season season = getSeason(year);
		List<Round> rounds = season.getRounds();
		return (GroupsRound) rounds.get(round + 2);

	}

	/**
	 * 
	 * @param year
	 *            season number
	 * @return
	 */
	public PlayoffsRound getPlayoffsRound(int year) {

		Season season = getSeason(year);
		List<Round> rounds = season.getRounds();
		return (PlayoffsRound) rounds.get(5);

	}

	public Map<Team, Stats> getTeamsTotalStats() {

		Map<Team, Stats> statsTotal = new LinkedHashMap<>();

		List<Team> teams = serviceUtils.loadTeams();

		Season current = getCurrentSeason();
		List<Season> seasonsPast = serviceUtils.loadAllSeasons().subList(0, current.getSeasonYear());
		Collections.sort(teams, new CoefficientsRangeOrdering(serviceUtils.loadAllSeasons(), current.getSeasonYear()));

		for (Team team : teams) {
			Stats completeStats = new Stats();
			seasonsPast.forEach( (s) -> completeStats.addStats(s.getTeamsStats().get(team)));
			statsTotal.put(team, completeStats);
		}

		return statsTotal;

	}

	public List<TeamCoeffsDTO> getTeamsWithCoefficients() {

		List<Team> teams = serviceUtils.loadTeams();
		Season current = getCurrentSeason();

		List<TeamCoeffsDTO> teamsWithCoeffs = new ArrayList<>();
		for (Team team : teams) {
			int points = serviceUtils.getCoefficientsUntilSeason(team, current.getSeasonYear());
			TeamCoeffsDTO teamCoeffDTO = teamCoeffsMapper.toDTO(team);
			teamCoeffDTO.setCoefficients(points);
			teamsWithCoeffs.add(teamCoeffDTO);
		}
		Collections.sort(teamsWithCoeffs, Comparator.comparingInt(TeamCoeffsDTO::getCoefficients).reversed());

		int counter = 1;
		int redLine = 68 - teamsWithCoeffs.size();
		for(TeamCoeffsDTO teamCoeffsDTO : teamsWithCoeffs) {
			if(counter == 1) {
				teamCoeffsDTO.setSeed(Seed.TO_GROUPS);
			}else if( counter < 5) {
				teamCoeffsDTO.setSeed(Seed.TO_QUALS_2);
			}else if(counter < (redLine+1)) {
				teamCoeffsDTO.setSeed(Seed.TO_QUALS_1);
			}else {
				teamCoeffsDTO.setSeed(Seed.TO_PRELIMINARY);
			}
			counter ++;
		}

		return teamsWithCoeffs;

	}

	public Map<String, Object> gameStats() {
		Map<String, Object> gamestats = new LinkedHashMap<>();

		DecimalFormat numberFormat = new DecimalFormat("0.00");

		@SuppressWarnings("unchecked")
		List<Result> results = sessionFactory.getCurrentSession().createQuery("from RESULTS where HOME_GOALS IS NOT NULL "
				+ "and AWAY_GOALS IS NOT NULL").list();

		if (results.isEmpty()) {
			return gamestats;
		}

		int numOfGames = results.size();
		long wins = results.stream().filter(Result::homeTeamWon).count();
		long draws = results.stream().filter(Result::tie).count();
		long losses = results.stream().filter(Result::awayTeamWon).count();
		double winsPercent = Precision.round(1.0 * wins / numOfGames, 2);
		double drawsPercent = Precision.round(1.0 * draws / numOfGames, 2);
		double lossesPercent = Precision.round(1.0 * losses / numOfGames, 2);

		gamestats.put("number of games played", numOfGames);
		gamestats.put("wins", wins);
		gamestats.put("draws", draws);
		gamestats.put("losses", losses);
		gamestats.put("avg goals scored", numberFormat
				.format(results.stream().mapToDouble(Result::getGoalsMadeByHomeTeam).average().getAsDouble()));
		gamestats.put("avg goals conceded", numberFormat
				.format(results.stream().mapToDouble(Result::getGoalsMadeByAwayTeam).average().getAsDouble()));

		gamestats.put("wins_percent", winsPercent);
		gamestats.put("draws_percent", drawsPercent);
		gamestats.put("losses_percent", lossesPercent);


		return gamestats;
	}

	public Map<String, Object> generalData() {
		Map<String, Object> generalData = new LinkedHashMap<>();

		generalData.put("databaseConnection", serviceUtils.testDbConnection());
		generalData.put("teamsLoaded", Utils.getTeamsFromFile(logger, serviceUtils.loadTeams()).size());

		return generalData;
	}

	public List<Team> getTeams() {
		List<Team> teams = serviceUtils.loadTeams();
		return teams;
	}

}
