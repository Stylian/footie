package gr.manolis.stelios.footie.api.services;

import gr.manolis.stelios.footie.api.dtos.TeamCoeffsDTO;
import gr.manolis.stelios.footie.api.mappers.GameMapper;
import gr.manolis.stelios.footie.api.mappers.TeamCoeffsMapper;
import gr.manolis.stelios.footie.core.Utils;
import gr.manolis.stelios.footie.core.peristence.dtos.Seed;
import gr.manolis.stelios.footie.core.peristence.dtos.Stats;
import gr.manolis.stelios.footie.core.peristence.dtos.Team;
import gr.manolis.stelios.footie.core.peristence.dtos.games.Game;
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

import javax.swing.*;
import javax.transaction.Transactional;
import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.util.*;
import java.util.stream.Collectors;

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

    @Autowired
    private GameMapper gameMapper;

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

	public Map<Team, Map<String, Object>> getTeamsTotalStats() {

		Map<Team, Map<String, Object>> allTeamsData = new LinkedHashMap<>();

		List<Team> teams = serviceUtils.loadTeams();

		Season current = getCurrentSeason();
		List<Season> seasonsPast = serviceUtils.loadAllSeasons().subList(0, current.getSeasonYear());
		Collections.sort(teams, new CoefficientsRangeOrdering(serviceUtils.loadAllSeasons(), current.getSeasonYear()));

		for (Team team : teams) {
			Stats completeStats = new Stats();
			seasonsPast.forEach( (s) -> completeStats.addStats(s.getTeamsStats().get(team)));

			int elo = team.getStatsForGroup(current).getElo();
			completeStats.setElo(elo);

			Map<String, Object> allTeamData = gameStats(team.getId(), elo);
			allTeamData.put("stats", completeStats);
			allTeamsData.put(team, allTeamData);
		}

		return allTeamsData;

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
	    return gameStats(0, 0);
    }

	public Map<String, Object> gameStats(Team team) {
	    return gameStats(team.getId(), team.getAllStats().getElo());
    }

	public Map<String, Object> gameStats(int teamId, int teamElo) {

		Map<String, Object> gamestats = new LinkedHashMap<>();

		DecimalFormat numberFormat = new DecimalFormat("0.00");
		numberFormat.setDecimalFormatSymbols(DecimalFormatSymbols.getInstance(Locale.US));

        List<Result> results = null;
        List<Result> resultsAway = null;

        List<Game> games5Home = new ArrayList<>();
        List<Game> games5Away = new ArrayList<>();

        if(teamId > 0) {

            List<Game> games1 = sessionFactory.getCurrentSession().createQuery(
                    "from GAMES where HOME_TEAM_ID=" + teamId).list();

            List<Game> gamesAway1 = sessionFactory.getCurrentSession().createQuery(
                    "from GAMES where AWAY_TEAM_ID=" + teamId).list();

            List<Game> games = games1.stream()
                    .filter( g -> g.getResult() != null)
                    .collect(Collectors.toList());

            List<Game> gamesAway = gamesAway1.stream()
                    .filter( g -> g.getResult() != null)
                    .collect(Collectors.toList());

            results = games.stream()
                    .map(Game::getResult)
                    .collect(Collectors.toList());

            resultsAway = gamesAway.stream()
                    .map(Game::getResult)
                    .collect(Collectors.toList());

            // pick last 5 games home and away
            if (games.size() > 5) {
                games5Home = games.subList(games.size()-5, games.size());
            }else {
                games5Home = games;
            }
            if(gamesAway.size() > 5) {
                games5Away = gamesAway.subList(gamesAway.size() - 5, gamesAway.size());
            }else {
                games5Away = gamesAway;
            }

        }else {
            results = sessionFactory.getCurrentSession().createQuery("from RESULTS where HOME_GOALS IS " +
                    "NOT NULL and AWAY_GOALS IS NOT NULL").list();
        }

		int numOfGames = results.size();
		long wins = results.stream().filter(Result::homeTeamWon).count();
		long draws = results.stream().filter(Result::tie).count();
		long losses = results.stream().filter(Result::awayTeamWon).count();
		double winsPercent = Precision.round(1.0 * wins / numOfGames, 2);
		double drawsPercent = Precision.round(1.0 * draws / numOfGames, 2);
		double lossesPercent = Precision.round(1.0 * losses / numOfGames, 2);
		double avgGoalsScored;
		double avgGoalsConceded;
		if (results.isEmpty()) {
			avgGoalsScored = 0;
			avgGoalsConceded = 0;
		}else {
			avgGoalsScored = results.stream().mapToDouble(Result::getGoalsMadeByHomeTeam).average().getAsDouble();
			avgGoalsConceded =  results.stream().mapToDouble(Result::getGoalsMadeByAwayTeam).average().getAsDouble();
		}

		gamestats.put("number of games played", numOfGames);
		gamestats.put("wins", wins);
		gamestats.put("draws", draws);
		gamestats.put("losses", losses);
		gamestats.put("avg goals scored", numberFormat.format(avgGoalsScored));
		gamestats.put("avg goals conceded", numberFormat.format(avgGoalsConceded));

		gamestats.put("wins_percent", winsPercent);
		gamestats.put("draws_percent", drawsPercent);
		gamestats.put("losses_percent", lossesPercent);

		//radar coeffs
		double radarGoalsScored = fitToRange((avgGoalsScored + Math.pow(avgGoalsScored - 1, 1.5)) * 7.7);
		double radarGoalsConceded = fitToRange((3.5 - avgGoalsConceded + Math.pow(3.5 - avgGoalsConceded, 2)) * 8);

		gamestats.put("radarGoalsScored", radarGoalsScored);
		gamestats.put("radarGoalsConceded", radarGoalsConceded);

		if(teamId > 0) {

			//away
			int numOfGamesAway = resultsAway.size();
			long winsAway = resultsAway.stream().filter(Result::awayTeamWon).count();
			long drawsAway = resultsAway.stream().filter(Result::tie).count();
			long lossesAway = resultsAway.stream().filter(Result::homeTeamWon).count();
			double winsPercentAway = Precision.round(1.0 * winsAway / numOfGamesAway, 2);
			double drawsPercentAway = Precision.round(1.0 * drawsAway / numOfGamesAway, 2);
			double lossesPercentAway = Precision.round(1.0 * lossesAway / numOfGamesAway, 2);
			double avgGoalsScoredAway;
			double avgGoalsConcededAway;
			if (resultsAway.isEmpty()) {
				avgGoalsScoredAway = 0;
				avgGoalsConcededAway = 0;
			}else {
				avgGoalsScoredAway = resultsAway.stream().mapToDouble(Result::getGoalsMadeByAwayTeam).average().getAsDouble();
				avgGoalsConcededAway =  resultsAway.stream().mapToDouble(Result::getGoalsMadeByHomeTeam).average().getAsDouble();
			}

			//away
			gamestats.put("number of games played away", numOfGamesAway);
			gamestats.put("winsAway", winsAway);
			gamestats.put("drawsAway", drawsAway);
			gamestats.put("lossesAway", lossesAway);

			gamestats.put("wins_percent_away", winsPercentAway);
			gamestats.put("draws_percent_away", drawsPercentAway);
			gamestats.put("losses_percent_away", lossesPercentAway);

			gamestats.put("avg goals scored away", numberFormat.format(avgGoalsScoredAway));
			gamestats.put("avg goals conceded away", numberFormat.format(avgGoalsConcededAway));

			//radar coeffs
			double radarGoalsScoredAway = fitToRange((avgGoalsScoredAway + 1.1 + Math.pow(avgGoalsScoredAway + 1.1, 2)) * 10);
			double radarGoalsConcededAway = fitToRange((6.5 - avgGoalsConcededAway + Math.pow(6.5 - avgGoalsConcededAway, 2) )* 6.35);

			// 0 for 800, 100  for 1600
			// might be too much for this league
//			double radarElo = fitToRange(
//					((teamElo < 1200) ? -1 : 1) *
//					Math.pow(teamElo - 1200, 2)/3200 + 50); // good for now, but to change

			// 0 for 1000, 100  for 1400
			double radarElo = fitToRange(
					((teamElo < 1200) ? -1 : 1) *
					Math.pow(teamElo - 1200, 2)/800 + 50); // good for now, but to change
			gamestats.put("radarElo", radarElo);

			gamestats.put("radarGoalsScoredAway", radarGoalsScoredAway);
			gamestats.put("radarGoalsConcededAway", radarGoalsConcededAway);

			gamestats.put("games5Home", gameMapper.toDTO(games5Home));
			gamestats.put("games5Away", gameMapper.toDTO(games5Away));
		}

		// scores frequency graphs
		Map<Result, Integer> resultsFrequency = new LinkedHashMap<>();

		for(int x = 20; x >= 0; x --) {
			for (int y = 0; y < 10; y++) {
				resultsFrequency.put(new Result(x, y), 0);
			}
		}

		for(Result result: results) {
			if(resultsFrequency.containsKey(result)) {
				Integer count = resultsFrequency.get(result);
				count ++;
				resultsFrequency.put(result, count);
			}else {
				resultsFrequency.put(result, 1);
			}
		}

		resultsFrequency = resultsFrequency.entrySet().stream()
				.filter( e -> e.getValue() > 0)
				.collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue, (o, n) -> o, LinkedHashMap::new));

		gamestats.put("results_frequency", resultsFrequency);

		// home/away goals distribution
		Map<String, Integer> homeGoalsFrequency = new LinkedHashMap<>();
		Map<String, Integer> awayGoalsFrequency = new LinkedHashMap<>();

		for(int x = 0; x < 10; x++) {
			homeGoalsFrequency.put("" + x, 0);
			awayGoalsFrequency.put("" + x, 0);
		}
		homeGoalsFrequency.put("10+", 0);
		awayGoalsFrequency.put("10+", 0);

		for(Result result : results) {
			int homeGoals = result.getGoalsMadeByHomeTeam();
			String strHomeGoals = homeGoals < 10 ? ("" + homeGoals) : "10+";
			homeGoalsFrequency.put(strHomeGoals, homeGoalsFrequency.get(strHomeGoals) + 1);

			int awayGoals = result.getGoalsMadeByAwayTeam();
			String strAwayGoals = awayGoals < 10 ? ("" + awayGoals) : "10+";
			awayGoalsFrequency.put(strAwayGoals, awayGoalsFrequency.get(strAwayGoals) + 1);
		}

		gamestats.put("home_goals_frequency", homeGoalsFrequency);
		gamestats.put("away_goals_frequency", awayGoalsFrequency);

		return gamestats;
	}

	private double fitToRange(double v) {
		v = Math.min(v, 100);
		v = Math.max(v, 20);
		return v;
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
