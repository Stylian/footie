package main.java.dtos.rounds;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;

import main.java.dtos.Matchup;
import main.java.dtos.Season;

@Entity
@DiscriminatorValue(value = "Q")
public class QualsRound extends Round {

	public QualsRound(Season season) {
		super(season);
	}
	
//	@ManyToOne(cascade = CascadeType.ALL)
//	private List<Matchup> matchups;
	
}