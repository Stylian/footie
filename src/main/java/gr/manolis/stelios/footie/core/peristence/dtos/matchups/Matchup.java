package gr.manolis.stelios.footie.core.peristence.dtos.matchups;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import gr.manolis.stelios.footie.core.peristence.dtos.Team;
import gr.manolis.stelios.footie.core.peristence.dtos.games.Game;
import gr.manolis.stelios.footie.core.peristence.dtos.games.MatchupGame;

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
	@Enumerated(EnumType.ORDINAL)
	private MatchupFormat format;
	
	@Column(name = "TIE_STRATEGY")
	@Enumerated(EnumType.ORDINAL)
	private MatchupTieStrategy tieStrategy;
	
	@ManyToOne(cascade = CascadeType.ALL)
	private Team winner;

	public Matchup() {
		games = new ArrayList<>();
	}

	public Matchup(Team home, Team away, MatchupFormat format, MatchupTieStrategy tieStrategy) {
		this();
		this.teamHome = home;
		this.teamAway = away;
		this.format = format;
		this.tieStrategy = tieStrategy;

		createGames();
	}

	private void createGames() {

		switch (format) {
		case FORMAT_IN_OUT_SINGLE:
			games.add(new MatchupGame(teamAway, teamHome, this));
			games.add(new MatchupGame(teamHome, teamAway, this));
			break;
		case FORMAT_IN_OUT_DOUBLE:
			games.add(new MatchupGame(teamHome, teamAway, this));
			games.add(new MatchupGame(teamAway, teamHome, this));
			games.add(new MatchupGame(teamAway, teamHome, this));
			games.add(new MatchupGame(teamHome, teamAway, this));
			break;
		}

	}
	
	public int getId() {
		return id;
	}

	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
	public Team getTeamHome() {
		return teamHome;
	}

	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
	public Team getTeamAway() {
		return teamAway;
	}

	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
	public List<Game> getGames() {
		return games;
	}
	
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
	public Team getWinner() {
		return winner;
	}

	public void setWinner(Team winner) {
		this.winner = winner;
	}

	@Override
	public String toString() {
		return "Matchup [teamHome=" + teamHome + ", teamAway=" + teamAway + "]";
	}

}
