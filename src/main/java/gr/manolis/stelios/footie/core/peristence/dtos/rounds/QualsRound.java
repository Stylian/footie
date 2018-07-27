package gr.manolis.stelios.footie.core.peristence.dtos.rounds;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import gr.manolis.stelios.footie.core.peristence.dtos.Team;
import gr.manolis.stelios.footie.core.peristence.dtos.groups.Season;
import gr.manolis.stelios.footie.core.peristence.dtos.matchups.Matchup;

@Entity
@DiscriminatorValue(value = "Q")
public class QualsRound extends Round {

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<Matchup> matchups = new ArrayList<>();

	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "QUALS_STRONG_TEAMS")
	private List<Team> strongTeams;

	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "QUALS_WEAK_TEAMS")
	private List<Team> weakTeams;

	public QualsRound() {
	}

	public QualsRound(Season season, String name) {
		super(season, name);
	}

	public void addMatchup(Matchup matchup) {
		this.matchups.add(matchup);
	}

	@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
	public List<Matchup> getMatchups() {
		return matchups;
	}

	@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
	public List<Team> getStrongTeams() {
		return strongTeams;
	}

	public void setStrongTeams(List<Team> strongTeams) {
		this.strongTeams = strongTeams;
	}

	@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
	public List<Team> getWeakTeams() {
		return weakTeams;
	}

	public void setWeakTeams(List<Team> weakTeams) {
		this.weakTeams = weakTeams;
	}

	@Override
	public String toString() {
		return "QualsRound [matchups=" + matchups.size() + ", strongTeams=" + strongTeams.size() +", weakTeams=" + weakTeams.size()  + "]";
	}

}
