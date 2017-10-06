package main.java.tools;

import java.util.List;

import main.java.dtos.Game;
import main.java.dtos.Team;

public interface GameMaker {

	public List<Game> createGames(List<Team> teams);
	
}
