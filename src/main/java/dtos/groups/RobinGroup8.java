package main.java.dtos.groups;

import java.util.List;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

import main.java.dtos.Team;
import main.java.dtos.games.GroupGame;

@Entity
@DiscriminatorValue(value = "R8")
public class RobinGroup8 extends RobinGroup {
	
	public RobinGroup8() {
	}

	public RobinGroup8(String name) {
		super(name);
	}

	public void buildGames() {

		 List<Team> teams = getTeams();
		
		 addGame(new GroupGame(teams.get(0), teams.get(2), this));
		 addGame(new GroupGame(teams.get(1), teams.get(3), this));
		 addGame(new GroupGame(teams.get(3), teams.get(0), this));
		 addGame(new GroupGame(teams.get(2), teams.get(1), this));
		 addGame(new GroupGame(teams.get(1), teams.get(2), this));
		 addGame(new GroupGame(teams.get(3), teams.get(1), this));
		 addGame(new GroupGame(teams.get(2), teams.get(0), this));
		 addGame(new GroupGame(teams.get(0), teams.get(3), this));
		
	}

}
