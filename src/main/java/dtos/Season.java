package main.java.dtos;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity(name = "SEASON")
public class Season {

	@Id
	@GeneratedValue
	@Column(name = "ID")
	private int id;

	@Column(name = "YEAR", unique = true)
	private int seasonYear;
	
	@ManyToOne(cascade = CascadeType.ALL)
	private Team winner;
	
	// temp transient
	private transient GroupsRound groupsRound;
	private transient PlayoffsRound playoffsRound;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

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

}
