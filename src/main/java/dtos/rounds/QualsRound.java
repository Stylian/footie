package main.java.dtos.rounds;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.OneToMany;

import main.java.dtos.Matchup;
import main.java.dtos.Season;
import main.java.dtos.Team;

@Entity
@DiscriminatorValue(value = "Q")
public class QualsRound extends Round {

	@OneToMany(cascade = CascadeType.ALL)
	private List<Matchup> matchups;

	@OneToMany(cascade = CascadeType.ALL)
	private List<Team> teams;
	
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
	
}
