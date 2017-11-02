package main.java.dtos.groups;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

import main.java.dtos.Team;
import main.java.dtos.games.Game;

@Entity
@DiscriminatorValue(value = "R12")
public class RobinGroup12 extends RobinGroup {

	public RobinGroup12() {
	}
	
	public RobinGroup12(String name) {
		super(name);
	}
	
	public void buildGames() {

		List<Team> teams = new ArrayList<>(getTeams());
		
		addGame(new Game());
		
	}
	
}
