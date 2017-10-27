package main.java.dtos.rounds;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;

import main.java.dtos.Matchup;
import main.java.dtos.Season;
import main.java.dtos.Team;

@Entity
@DiscriminatorValue(value = "Q")
public class QualsRound extends Round {

	@OneToMany(cascade = CascadeType.ALL, fetch=FetchType.LAZY)
	private List<Matchup> matchups;
	
	@ManyToMany(fetch=FetchType.LAZY)
	private List<Team> teams;
	
	@ManyToMany(fetch=FetchType.LAZY)
	@JoinTable(name="QUALS_STRONG_TEAMS")
	private List<Team> strongTeams;
	
	@ManyToMany(fetch=FetchType.LAZY)
	@JoinTable(name="QUALS_WEAK_TEAMS")
	private List<Team> weakTeams;
	
	public QualsRound() {
	}
			
	public QualsRound(Season season, String name) {
		super(season, name);
	}
	

	public List<Team> getTeams() {
		return teams;
	}

	public void setTeams(List<Team> teams) {
		this.teams = teams;
	}

	public void addMatchup(Matchup matchup) {
		this.matchups.add(matchup);
	}

	public List<Matchup> getMatchups() {
		return matchups;
	}

	public List<Team> getStrongTeams() {
		return strongTeams;
	}

	public void setStrongTeams(List<Team> strongTeams) {
		this.strongTeams = strongTeams;
	}

	public List<Team> getWeakTeams() {
		return weakTeams;
	}

	public void setWeakTeams(List<Team> weakTeams) {
		this.weakTeams = weakTeams;
	}
	
}
