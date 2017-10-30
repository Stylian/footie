package main.java.dtos.groups;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.OneToMany;

import main.java.dtos.Game;

@Entity
@DiscriminatorValue(value = "R")
public class RobinGroup extends Group {

	@OneToMany(cascade = CascadeType.ALL)
	private List<Game> games;

	public RobinGroup() {
	}
	
	public RobinGroup(String name) {
		super(name);
		games = new ArrayList<>();
	}

	public List<Game> getGames() {
		return games;
	}

	public void addGame(Game game) {
		games.add(game);
	}

	public void addGames(List<Game> newGames) {
		games.addAll(newGames);
	}

}
