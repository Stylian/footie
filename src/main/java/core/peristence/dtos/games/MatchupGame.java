package core.peristence.dtos.games;

import javax.persistence.CascadeType;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;

import core.peristence.dtos.Team;
import core.peristence.dtos.matchups.Matchup;

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
