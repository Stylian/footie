package gr.manolis.stelios.footie.core.peristence.dtos.groups;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import gr.manolis.stelios.footie.core.peristence.dtos.Player;
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

	@ManyToOne(cascade = CascadeType.ALL)
	private Team overachiever;

	@ManyToOne(cascade = CascadeType.ALL)
	private Team underperformer;

	@ManyToOne(cascade = CascadeType.ALL)
	private Player playerOfTheSeason;

	@ManyToOne(cascade = CascadeType.ALL)
	private Player dreamTeamGK;

	@ManyToOne(cascade = CascadeType.ALL)
	private Player dreamTeamDL;

	@ManyToOne(cascade = CascadeType.ALL)
	private Player dreamTeamDR;

	@ManyToOne(cascade = CascadeType.ALL)
	private Player dreamTeamDCL;

	@ManyToOne(cascade = CascadeType.ALL)
	private Player dreamTeamDCR;

	@ManyToOne(cascade = CascadeType.ALL)
	private Player dreamTeamCML;

	@ManyToOne(cascade = CascadeType.ALL)
	private Player dreamTeamCMR;

	@ManyToOne(cascade = CascadeType.ALL)
	private Player dreamTeamAMR;

	@ManyToOne(cascade = CascadeType.ALL)
	private Player dreamTeamAML;

	@ManyToOne(cascade = CascadeType.ALL)
	private Player dreamTeamAMC;

	@ManyToOne(cascade = CascadeType.ALL)
	private Player dreamTeamST;

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

	public Team getOverachiever() {
		return overachiever;
	}

	public void setOverachiever(Team overachiever) {
		this.overachiever = overachiever;
	}

	public Team getUnderperformer() {
		return underperformer;
	}

	public void setUnderperformer(Team underperformer) {
		this.underperformer = underperformer;
	}

	public Player getPlayerOfTheSeason() {
		return playerOfTheSeason;
	}

	public void setPlayerOfTheSeason(Player playerOfTheSeason) {
		this.playerOfTheSeason = playerOfTheSeason;
	}

	public Player getDreamTeamGK() {
		return dreamTeamGK;
	}

	public void setDreamTeamGK(Player dreamTeamGK) {
		this.dreamTeamGK = dreamTeamGK;
	}

	public Player getDreamTeamDL() {
		return dreamTeamDL;
	}

	public void setDreamTeamDL(Player dreamTeamDL) {
		this.dreamTeamDL = dreamTeamDL;
	}

	public Player getDreamTeamDR() {
		return dreamTeamDR;
	}

	public void setDreamTeamDR(Player dreamTeamDR) {
		this.dreamTeamDR = dreamTeamDR;
	}

	public Player getDreamTeamDCL() {
		return dreamTeamDCL;
	}

	public void setDreamTeamDCL(Player dreamTeamDCL) {
		this.dreamTeamDCL = dreamTeamDCL;
	}

	public Player getDreamTeamDCR() {
		return dreamTeamDCR;
	}

	public void setDreamTeamDCR(Player dreamTeamDCR) {
		this.dreamTeamDCR = dreamTeamDCR;
	}

	public Player getDreamTeamCML() {
		return dreamTeamCML;
	}

	public void setDreamTeamCML(Player dreamTeamCML) {
		this.dreamTeamCML = dreamTeamCML;
	}

	public Player getDreamTeamCMR() {
		return dreamTeamCMR;
	}

	public void setDreamTeamCMR(Player dreamTeamCMR) {
		this.dreamTeamCMR = dreamTeamCMR;
	}

	public Player getDreamTeamAMR() {
		return dreamTeamAMR;
	}

	public void setDreamTeamAMR(Player dreamTeamAMR) {
		this.dreamTeamAMR = dreamTeamAMR;
	}

	public Player getDreamTeamAML() {
		return dreamTeamAML;
	}

	public void setDreamTeamAML(Player dreamTeamAML) {
		this.dreamTeamAML = dreamTeamAML;
	}

	public Player getDreamTeamAMC() {
		return dreamTeamAMC;
	}

	public void setDreamTeamAMC(Player dreamTeamAMC) {
		this.dreamTeamAMC = dreamTeamAMC;
	}

	public Player getDreamTeamST() {
		return dreamTeamST;
	}

	public void setDreamTeamST(Player dreamTeamST) {
		this.dreamTeamST = dreamTeamST;
	}
}
