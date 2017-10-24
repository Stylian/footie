package main.java.dtos;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;

import main.java.dtos.rounds.GroupsRound;
import main.java.dtos.rounds.PlayoffsRound;

@Entity
@DiscriminatorValue(value = "S")
public class Season extends Group {

	@Column(name = "SEASON_YEAR", unique = true)
	private int seasonYear;

	@ManyToOne(cascade = CascadeType.ALL)
	private Team winner;

	// temp transient
	private transient GroupsRound groupsRound;
	private transient PlayoffsRound playoffsRound;

	public int getSeasonYear() {
		return seasonYear;
	}

	public void setSeasonYear(int seasonYear) {
		this.seasonYear = seasonYear;
	}

	public PlayoffsRound getPlayoffsRound() {
		return playoffsRound;
	}

	public void setPlayoffsRound(PlayoffsRound playoffsRound) {
		this.playoffsRound = playoffsRound;
	}

	public GroupsRound getGroupsRound() {
		return groupsRound;
	}

	public void setGroupsRound(GroupsRound groupsRound) {
		this.groupsRound = groupsRound;
	}

	public Team getWinner() {
		return winner;
	}

	public void setWinner(Team winner) {
		this.winner = winner;
	}

	@Override
	public String toString() {
		return "Season [seasonYear=" + seasonYear + ", winner=" + winner + "]";
	}

}
