package main.java.dtos;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

@Entity(name = "GAMES")
public class Game {

	@Id
	@GeneratedValue
	@Column(name = "ID")
	private int id;

	@ManyToOne(cascade = CascadeType.ALL)
	private Team homeTeam;

	@ManyToOne(cascade = CascadeType.ALL)
	private Team awayTeam;

	@ManyToOne(cascade = CascadeType.ALL)
	private Matchup matchup;

	// could change to manyToOne and make the result combination to unique
	@OneToOne(cascade = CascadeType.ALL)
	private Result result;

	public Game() {
	}

	public Game(Team homeTeam, Team awayTeam, Matchup matchup) {
		this.homeTeam = homeTeam;
		this.awayTeam = awayTeam;
		this.matchup = matchup;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Team getHomeTeam() {
		return homeTeam;
	}

	public void setHomeTeam(Team homeTeam) {
		this.homeTeam = homeTeam;
	}

	public Team getAwayTeam() {
		return awayTeam;
	}

	public void setAwayTeam(Team awayTeam) {
		this.awayTeam = awayTeam;
	}

	public Result getResult() {
		return result;
	}

	public void setResult(Result result) {
		this.result = result;
	}

	public Matchup getMatchup() {
		return matchup;
	}

	@Override
	public String toString() {
		return homeTeam + " - " + awayTeam + " " + result;
	}

}
