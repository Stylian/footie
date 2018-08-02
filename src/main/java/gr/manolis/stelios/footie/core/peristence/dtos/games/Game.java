package gr.manolis.stelios.footie.core.peristence.dtos.games;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.DiscriminatorColumn;
import javax.persistence.DiscriminatorType;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import gr.manolis.stelios.footie.core.peristence.dtos.Team;

@Entity(name = "GAMES")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "discriminator", discriminatorType = DiscriminatorType.STRING)
@DiscriminatorValue(value = "G")
public class Game {

	public static final int EXTRA_GAME = -1;
	
	@Id
	@GeneratedValue
	@Column(name = "ID")
	private int id;

	@ManyToOne(cascade = CascadeType.ALL)
	private Team homeTeam;

	@ManyToOne(cascade = CascadeType.ALL)
	private Team awayTeam;

	// could change to manyToOne and make the result combination to unique
	@OneToOne(cascade = CascadeType.ALL)
	private Result result;

	@Column(name = "DAY")
	private int day;

	public Game() {
	}

	public Game(Team homeTeam, Team awayTeam, int day) {
		this.homeTeam = homeTeam;
		this.awayTeam = awayTeam;
		this.day = day;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
	public Team getHomeTeam() {
		return homeTeam;
	}

	public void setHomeTeam(Team homeTeam) {
		this.homeTeam = homeTeam;
	}

	@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
	public Team getAwayTeam() {
		return awayTeam;
	}

	public void setAwayTeam(Team awayTeam) {
		this.awayTeam = awayTeam;
	}

	@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
	public Result getResult() {
		return result;
	}

	public void setResult(Result result) {
		this.result = result;
	}

	public int getDay() {
		return day;
	}

	public void setDay(int day) {
		this.day = day;
	}

	@Override
	public String toString() {
		return homeTeam + " - " + awayTeam + " " + result;
	}

}
