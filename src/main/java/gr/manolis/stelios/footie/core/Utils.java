package gr.manolis.stelios.footie.core;

import gr.manolis.stelios.footie.core.peristence.dtos.Team;
import gr.manolis.stelios.footie.core.peristence.dtos.games.Game;
import gr.manolis.stelios.footie.core.peristence.dtos.groups.Group;
import gr.manolis.stelios.footie.core.peristence.dtos.groups.Season;
import gr.manolis.stelios.footie.core.peristence.dtos.matchups.Matchup;
import gr.manolis.stelios.footie.core.peristence.dtos.rounds.Round;
import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

public class Utils {

	public static File getDatabaseFile() {
		String footieFolder = FileUtils.getUserDirectory()  + File.separator + "footie";
		return new File(footieFolder + File.separator + "data");
	}

	public static String getBackupsFolderPath() {
		String footieFolder = FileUtils.getUserDirectory()  + File.separator + "footie";
		return footieFolder + File.separator + "backups"  + File.separator;
	}

	public static File getTeamsFile() {
		String footieFolder = FileUtils.getUserDirectory()  + File.separator + "footie";
		return new File(footieFolder + File.separator + "teams.txt");
	}

	public static File getRulesFile() {
		String footieFolder = FileUtils.getUserDirectory()  + File.separator + "footie";
		return new File(footieFolder + File.separator + "rules.txt");
	}

	public static String toString(List<?> lsObj) {
		return lsObj.stream().map(Object::toString).collect(Collectors.joining(","));
	}

	public static String toString(Set<?> lsObj) {
		return lsObj.stream().map(Object::toString).collect(Collectors.joining(","));
	}

	// half points only for quals
	public static void addGamePointsForMatchup(Group group, Matchup matchup) {
		addGamePointsForMatchup(group, matchup, false);
	}

	public static void addGamePointsForMatchup(Group group, Matchup matchup, boolean doublePoints) {
		int matchPointsHome = 0;
		int matchPointsAway = 0;
		int numberOfGames = 0;

		for (Game game : matchup.getGames()) {

			numberOfGames++;

			if (game.getResult().homeTeamWon()) {

				if (game.getHomeTeam().equals(matchup.getTeamHome())) {
					matchPointsHome += Rules.WIN_POINTS;
				} else if (game.getHomeTeam().equals(matchup.getTeamAway())) {
					matchPointsAway += Rules.WIN_POINTS;
				} else {
					System.out.println("AAAAAAAAAAAAAAAAAAAAA");
				}

			} else if (game.getResult().tie()) {

				if (game.getHomeTeam().equals(matchup.getTeamHome())) {
					matchPointsHome += Rules.DRAW_POINTS;
				} else if (game.getHomeTeam().equals(matchup.getTeamAway())) {
					matchPointsAway += Rules.DRAW_POINTS;
				} else {
					System.out.println("AAAAAAAAAAAAAAAAAAAAA");
				}

			}

			// add points for goals scored
			if(game.getHomeTeam().equals(matchup.getTeamHome())) {
				matchPointsHome += game.getResult().getGoalsMadeByHomeTeam() * Rules.GOALS_POINTS;
			}else {
				matchPointsAway += game.getResult().getGoalsMadeByHomeTeam() * Rules.GOALS_POINTS;
			}

		}

		int mult = doublePoints ? 2 : 1;

		matchup.getTeamHome().getStatsForGroup(group).addPoints(2 * mult * matchPointsHome / numberOfGames);
		matchup.getTeamAway().getStatsForGroup(group).addPoints(2 * mult * matchPointsAway / numberOfGames);
	}

	public static int getCoefficientsUntilSeason(List<Season> allSeasons, Team team, int seasonUntil) {
		List<Season> seasonsPast = allSeasons.subList(0, seasonUntil);
		Collections.reverse(seasonsPast);

		int p1 = 0;
		for(Season season : seasonsPast) {
			p1 += team.getStatsForGroup(season).getPoints();
		}

		return p1;
	}

	public static String autosave(Round round) {

		DateFormat dateFormat = new SimpleDateFormat("yyyy_MM_dd_HH_mm_ss");
		Date date = new Date();
		String strDate = dateFormat.format(date);

		File dataFolder = Utils.getDatabaseFile();
		File backupFolder = new File(Utils.getBackupsFolderPath() + "data_autosave_" + round.getName() + "_" + strDate);

		try {
			FileUtils.copyDirectory(dataFolder, backupFolder);

		} catch (IOException e) {
			e.printStackTrace();
		}

		return backupFolder.getName();
	}

	public static List<Team> getTeamsFromFile(Logger logger, List<Team> existingTeams) {
		logger.info("loading teams from file");

		List<Team> lsTeams = new ArrayList<>();
		try {
			File file = Utils.getTeamsFile();

			if (!file.exists()) {
				logger.error("teams file not found");
				return null;
			}

			List<String> teams = FileUtils.readLines(file, StandardCharsets.UTF_8);

			for (String tt : teams) {
				String teamName = tt.trim();
				if(StringUtils.isBlank(teamName)) {
					continue;
				}
				Team team = new Team(teamName);

				if(!existingTeams.contains(team)) {
					logger.info("adding " + teamName);
					lsTeams.add(team);
				}
			}
			lsTeams.addAll(existingTeams);

		} catch (IOException e) {
			e.printStackTrace();
		}
		return lsTeams;
	}
}
