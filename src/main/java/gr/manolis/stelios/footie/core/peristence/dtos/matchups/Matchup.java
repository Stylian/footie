package gr.manolis.stelios.footie.core.peristence.dtos.matchups;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import gr.manolis.stelios.footie.core.peristence.dtos.Team;
import gr.manolis.stelios.footie.core.peristence.dtos.games.Game;
import gr.manolis.stelios.footie.core.peristence.dtos.games.MatchupGame;
import gr.manolis.stelios.footie.core.peristence.dtos.rounds.Round;

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

	@OneToOne(cascade = CascadeType.ALL)
	public Round round;

	public Matchup() {
		games = new ArrayList<>();
	}

	public Matchup(Team home, Team away, MatchupFormat format, MatchupTieStrategy tieStrategy,
				   Round round) {
		this();
		this.teamHome = home;
		this.teamAway = away;
		this.format = format;
		this.tieStrategy = tieStrategy;
		this.round = round;

		createGames();
	}

	private void createGames() {

		switch (format) {
		case FORMAT_IN_OUT_SINGLE:
			games.add(new MatchupGame(teamAway, teamHome, 1, this));
			games.add(new MatchupGame(teamHome, teamAway, 1, this));
			break;
		case FORMAT_IN_OUT_DOUBLE:
			games.add(new MatchupGame(teamHome, teamAway, 1, this));
			games.add(new MatchupGame(teamAway, teamHome, 1, this));
			games.add(new MatchupGame(teamAway, teamHome, 2, this));
			games.add(new MatchupGame(teamHome, teamAway, 2, this));
			break;
		}

	}

	public int getId() {
		return id;
	}

	public Team getTeamHome() {
		return teamHome;
	}

	public Team getTeamAway() {
		return teamAway;
	}

	public List<Game> getGames() {
		return games;
	}

	public Team getWinner() {
		return winner;
	}

	public void setWinner(Team winner) {
		this.winner = winner;
	}

	public MatchupTieStrategy getTieStrategy() {
		return tieStrategy;
	}

	public void setTieStrategy(MatchupTieStrategy tieStrategy) {
		this.tieStrategy = tieStrategy;
	}

	public Round getRound() {
		return round;
	}

	public void setRound(Round round) {
		this.round = round;
	}

	@Override
	public String toString() {
		return "Matchup [teamHome=" + teamHome + ", teamAway=" + teamAway + "]";
	}

}
