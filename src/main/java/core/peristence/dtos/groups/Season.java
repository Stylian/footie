package core.peristence.dtos.groups;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import core.peristence.dtos.Team;
import core.peristence.dtos.rounds.Round;

@Entity
@DiscriminatorValue(value = "S")
public class Season extends Group {

	@Column(name = "SEASON_YEAR")
	private int seasonYear;

	@ManyToOne(cascade = CascadeType.ALL)
	private Team winner;

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<Round> rounds;

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

	public List<Round> getRounds() {
		return rounds;
	}

	@Override
	public String toString() {
		return "Season [seasonYear=" + seasonYear + ", winner=" + winner + "]";
	}

}
