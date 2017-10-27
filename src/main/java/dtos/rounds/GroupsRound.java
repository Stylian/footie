package main.java.dtos.rounds;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

import main.java.dtos.Season;

@Entity
@DiscriminatorValue(value = "G")
public class GroupsRound extends Round {

	
	
	
	public GroupsRound() {
	}
	
	
	public GroupsRound(Season season, String name) {
		super(season, name);
	}

	
	
	
	
	
	
}
