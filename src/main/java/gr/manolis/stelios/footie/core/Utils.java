package gr.manolis.stelios.footie.core;

import gr.manolis.stelios.footie.core.peristence.dtos.Team;
import gr.manolis.stelios.footie.core.peristence.dtos.games.Game;
import gr.manolis.stelios.footie.core.peristence.dtos.groups.Group;
import gr.manolis.stelios.footie.core.peristence.dtos.groups.Season;
import gr.manolis.stelios.footie.core.peristence.dtos.matchups.Matchup;
import org.apache.commons.io.FileUtils;

import java.io.File;
import java.util.Collections;
import java.util.List;
import java.util.Set;
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

	public static void addGamePointsForMatchup(Group group, Matchup matchup) {
		int matchPointsHome = 0;
		int matchPointsAway = 0;
		int numberOfGames = 0;

		for (Game game : matchup.getGames()) {

			numberOfGames++;

			if (game.getResult().homeTeamWon()) {

				if (game.getHomeTeam().equals(matchup.getTeamHome())) {
					matchPointsHome += Rules.WIN_POINTS;
				} else {
					matchPointsAway += Rules.WIN_POINTS;
				}

			} else if (game.getResult().tie()) {

				if (game.getHomeTeam().equals(matchup.getTeamHome())) {
					matchPointsHome += Rules.DRAW_POINTS;
				} else {
					matchPointsAway += Rules.DRAW_POINTS;
				}

			}

			// add points for goals scored
			if(game.getHomeTeam().equals(matchup.getTeamHome())) {
				matchPointsHome += game.getResult().getGoalsMadeByHomeTeam() * Rules.GOALS_POINTS;
			}else {
				matchPointsAway += game.getResult().getGoalsMadeByHomeTeam() * Rules.GOALS_POINTS;
			}

		}

		matchup.getTeamHome().getStatsForGroup(group).addPoints(2 * matchPointsHome / numberOfGames);
		matchup.getTeamAway().getStatsForGroup(group).addPoints(2 * matchPointsAway / numberOfGames);
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

}
