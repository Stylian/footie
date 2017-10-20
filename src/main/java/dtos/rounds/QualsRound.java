package main.java.dtos.rounds;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.ManyToOne;

import main.java.dtos.Matchup;

public class QualsRound extends Round {
	
	@ManyToOne(cascade = CascadeType.ALL)
	private List<Matchup> matchups;
	
}
