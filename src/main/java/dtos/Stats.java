package main.java.dtos;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity(name = "STATS")
public class Stats {

	@Id
	@GeneratedValue
	@Column(name = "ID")
	private int id;

	@Column(name = "POINTS")
	private int points;

	@Column(name = "WINS")
	private int wins;

	@Column(name = "DRAWS")
	private int draws;

	@Column(name = "LOSSES")
	private int losses;

	@Column(name = "GOALS_SCORED")
	private int goalsScored;

	@Column(name = "GOALS_CONCEDED")
	private int goalsConceded;

	@ManyToOne(cascade = CascadeType.ALL)
	private Team team;

	public int getMatchesPlayed() {
		return wins + draws + losses;
	}

	public int getGoalDifference() {
		return goalsScored - goalsConceded;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getPoints() {
		return points;
	}

	public void setPoints(int points) {
		this.points = points;
	}

	public int getWins() {
		return wins;
	}

	public void setWins(int wins) {
		this.wins = wins;
	}

	public int getDraws() {
		return draws;
	}

	public void setDraws(int draws) {
		this.draws = draws;
	}

	public int getLosses() {
		return losses;
	}

	public void setLosses(int losses) {
		this.losses = losses;
	}

	public int getGoalsScored() {
		return goalsScored;
	}

	public void setGoalsScored(int goalsScored) {
		this.goalsScored = goalsScored;
	}

	public int getGoalsConceded() {
		return goalsConceded;
	}

	public void setGoalsConceded(int goalsConceded) {
		this.goalsConceded = goalsConceded;
	}

	public Team getTeam() {
		return team;
	}

	public void setTeam(Team team) {
		this.team = team;
	}

	@Override
	public String toString() {
		return "Stats [id=" + id + ", points=" + points + ", wins=" + wins + ", draws=" + draws + ", losses=" + losses
				+ ", goalsScored=" + goalsScored + ", goalsConceded=" + goalsConceded + ", team=" + team + "]";
	}

}
