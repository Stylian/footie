package gr.manolis.stelios.footie.core.peristence.dtos.groups;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

import gr.manolis.stelios.footie.core.peristence.dtos.Stage;
import gr.manolis.stelios.footie.core.peristence.dtos.Team;
import gr.manolis.stelios.footie.core.peristence.dtos.rounds.Round;

@Entity(name = "SEASONS")
public class Season extends Group {

	@Column(name = "SEASON_YEAR")
	private int seasonYear;

	@ManyToOne(cascade = CascadeType.ALL)
	private Team winner;

	@ManyToOne(cascade = CascadeType.ALL)
	private Team runnerUp;

	@ManyToOne(cascade = CascadeType.ALL)
	private Team semifinalist1;

	@ManyToOne(cascade = CascadeType.ALL)
	private Team semifinalist2;

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "season")
	private List<Round> rounds;

	@Enumerated(EnumType.STRING)
	private Stage stage;
	
	public Season() {
	}

	public Season(int year) {
		super("Season " + year);
		this.seasonYear = year;

		rounds = new ArrayList<>();
	}

	public int getSeasonYear() {
		return seasonYear;
	}

	public Team getWinner() {
		return winner;
	}

	public void setWinner(Team winner) {
		this.winner = winner;
	}

	public void addRound(Round round) {
		rounds.add(round);
	}

	@JsonIgnore
	public List<Round> getRounds() {
		return rounds;
	}

	public Stage getStage() {
		return stage;
	}

	public void setStage(Stage stage) {
		this.stage = stage;
	}

	@Override
	public String toString() {
		return "Season [seasonYear=" + seasonYear + ", winner=" + winner + "]";
	}

	public Team getRunnerUp() {
		return runnerUp;
	}

	public void setRunnerUp(Team runnerUp) {
		this.runnerUp = runnerUp;
	}

	public Team getSemifinalist1() {
		return semifinalist1;
	}

	public void setSemifinalist1(Team semifinalist1) {
		this.semifinalist1 = semifinalist1;
	}

	public Team getSemifinalist2() {
		return semifinalist2;
	}

	public void setSemifinalist2(Team semifinalist2) {
		this.semifinalist2 = semifinalist2;
	}
}
