package main.java.service.peristence.dtos.groups;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

import main.java.service.peristence.dtos.Team;
import main.java.service.peristence.dtos.games.GroupGame;

@Entity
@DiscriminatorValue(value = "R8")
public class RobinGroup8 extends RobinGroup {
	
	// keeps order for game buildings
	private transient List<Team> teamsInserted = new ArrayList<>();
	
	public RobinGroup8() {
	}

	public RobinGroup8(String name) {
		super(name);
	}

	public void addTeam(Team team) {
		super.addTeam(team);
		teamsInserted.add(team);
	}
	
	public void buildGames() {

		 addGame(new GroupGame(teamsInserted.get(0), teamsInserted.get(2), this));
		 addGame(new GroupGame(teamsInserted.get(1), teamsInserted.get(3), this));
		 addGame(new GroupGame(teamsInserted.get(3), teamsInserted.get(0), this));
		 addGame(new GroupGame(teamsInserted.get(2), teamsInserted.get(1), this));
		 addGame(new GroupGame(teamsInserted.get(1), teamsInserted.get(2), this));
		 addGame(new GroupGame(teamsInserted.get(3), teamsInserted.get(1), this));
		 addGame(new GroupGame(teamsInserted.get(2), teamsInserted.get(0), this));
		 addGame(new GroupGame(teamsInserted.get(0), teamsInserted.get(3), this));
		
	}

}
