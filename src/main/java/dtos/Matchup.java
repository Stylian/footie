package main.java.dtos;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import main.java.dtos.enums.MatchupFormat;
import main.java.dtos.enums.MatchupTieStrategy;

@Entity(name = "MATCHUPS")
public class Matchup {

	@Id
	@GeneratedValue
	@Column(name = "ID")
	private int id;

	@ManyToOne(cascade = CascadeType.ALL)
	private Team teamHome;

	@ManyToOne(cascade = CascadeType.ALL)
	private Team teamAway;

	@OneToMany(cascade = CascadeType.ALL)
	private List<Game> games;

	@Column(name = "FORMAT")
	private MatchupFormat format;

	private MatchupTieStrategy tieStrategy;

	public Matchup() {
	}

	public Matchup(Team home, Team away, MatchupFormat format, MatchupTieStrategy tieStrategy) {
		this.teamHome = home;
		this.teamAway = away;
		this.format = format;
		this.tieStrategy = tieStrategy;

		createGames();
	}

	private void createGames() {

		switch (format) {
		case FORMAT_IN_OUT_SINGLE:
			new Game(teamHome, teamAway);
			new Game(teamAway, teamHome);
			break;
		case FORMAT_IN_OUT_DOUBLE:
			new Game(teamHome, teamAway);
			new Game(teamAway, teamHome);
			new Game(teamAway, teamHome);
			new Game(teamHome, teamAway);
			break;
		}

	}

	public Team getTeamHome() {
		return teamHome;
	}

	public Team getTeamAway() {
		return teamAway;
	}

	@Override
	public String toString() {
		return "Matchup [teamHome=" + teamHome + ", teamAway=" + teamAway + "]";
	}

}
