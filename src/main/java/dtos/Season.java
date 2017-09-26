package main.java.dtos;

public class Season {

	private int seasonYear;
	private GroupsRound roundOf24;
	private GroupsRound roundOf16;
	private PlayoffsRound playoffsRound;

	public int getSeasonYear() {
		return seasonYear;
	}

	public void setSeasonYear(int seasonYear) {
		this.seasonYear = seasonYear;
	}

	public GroupsRound getRoundOf24() {
		return roundOf24;
	}

	public void setRoundOf24(GroupsRound roundOf24) {
		this.roundOf24 = roundOf24;
	}

	public GroupsRound getRoundOf16() {
		return roundOf16;
	}

	public void setRoundOf16(GroupsRound roundOf16) {
		this.roundOf16 = roundOf16;
	}

	public PlayoffsRound getPlayoffsRound() {
		return playoffsRound;
	}

	public void setPlayoffsRound(PlayoffsRound playoffsRound) {
		this.playoffsRound = playoffsRound;
	}

}
