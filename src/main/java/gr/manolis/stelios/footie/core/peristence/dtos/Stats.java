package gr.manolis.stelios.footie.core.peristence.dtos;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;
import gr.manolis.stelios.footie.core.peristence.dtos.groups.Group;

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
	@JsonIgnore
	private Team team;

	@ManyToOne(cascade = CascadeType.ALL)
	@JsonIgnore
	private Group group;

	public Stats() {
	}

	public Stats(Group group, Team team) {
		this.group = group;
		this.team = team;

		this.team.addGroupStats(this.group, this);
	}

	/**
	 * clone constructor, ignores references
	 * 
	 * @param st
	 *          the stats to use
	 */
	public Stats(Stats st) {

		points = st.getPoints();
		wins = st.getWins();
		draws = st.getDraws();
		losses = st.getLosses();
		goalsScored = st.getGoalsScored();
		goalsConceded = st.getGoalsConceded();

	}

	public void addStats(Stats stats) {
		
		addPoints(stats.getPoints());
		addWins(stats.getWins());
		addDraws(stats.getDraws());
		addLosses(stats.getLosses());
		addGoalsScored(stats.getGoalsScored());
		addGoalsConceded(stats.getGoalsConceded());
		
	}

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

	public void addPoints(int points) {
		this.points += points;
	}

	public int getWins() {
		return wins;
	}

	public void addWins(int wins) {
		this.wins += wins;
	}

	public int getDraws() {
		return draws;
	}

	public void addDraws(int draws) {
		this.draws += draws;
	}

	public int getLosses() {
		return losses;
	}

	public void addLosses(int losses) {
		this.losses += losses;
	}

	public int getGoalsScored() {
		return goalsScored;
	}

	public void addGoalsScored(int goalsScored) {
		this.goalsScored += goalsScored;
	}

	public int getGoalsConceded() {
		return goalsConceded;
	}

	public void addGoalsConceded(int goalsConceded) {
		this.goalsConceded += goalsConceded;
	}

	public Team getTeam() {
		return team;
	}

	public Group getGroup() {
		return group;
	}

	@Override
	public String toString() {
		return "Stats [id=" + id + ", points=" + points + ", wins=" + wins + ", draws=" + draws + ", losses=" + losses
				+ ", goalsScored=" + goalsScored + ", goalsConceded=" + goalsConceded + ", team=" + team + ", group=" + group
				+ "]";
	}

}
