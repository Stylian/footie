package main.java.service.peristence.dtos.games;

import javax.persistence.CascadeType;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;

import main.java.service.peristence.dtos.Team;
import main.java.service.peristence.dtos.matchups.Matchup;

@Entity
@DiscriminatorValue(value = "MG")
public class MatchupGame extends Game {

	@ManyToOne(cascade = CascadeType.ALL)
	private Matchup matchup;
	
	public MatchupGame() {
	}
	
	public MatchupGame(Team homeTeam, Team awayTeam, Matchup matchup) {
		super(homeTeam, awayTeam);
		this.matchup = matchup;
	}

	public Matchup getMatchup() {
		return matchup;
	}
	
}
