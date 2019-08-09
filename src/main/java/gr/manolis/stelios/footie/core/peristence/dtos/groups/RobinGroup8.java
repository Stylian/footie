package gr.manolis.stelios.footie.core.peristence.dtos.groups;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

import gr.manolis.stelios.footie.core.peristence.dtos.Team;
import gr.manolis.stelios.footie.core.peristence.dtos.games.GroupGame;

@Entity
@DiscriminatorValue(value = "R8")
public class RobinGroup8 extends RobinGroup {

	// keeps order for game buildings
	private transient List<Team> teamsInserted = new ArrayList<>();

	public RobinGroup8() {
	}

	public RobinGroup8(String name, Season season) {
		super(name, season);
	}

	public void addTeam(Team team) {
		super.addTeam(team);
		teamsInserted.add(team);
	}

	public void buildGames() {

		addGame(new GroupGame(teamsInserted.get(0), teamsInserted.get(2), 1, this));
		addGame(new GroupGame(teamsInserted.get(1), teamsInserted.get(3), 1, this));
		addGame(new GroupGame(teamsInserted.get(3), teamsInserted.get(0), 2, this));
		addGame(new GroupGame(teamsInserted.get(2), teamsInserted.get(1), 2, this));
		addGame(new GroupGame(teamsInserted.get(1), teamsInserted.get(2), 3, this));
		addGame(new GroupGame(teamsInserted.get(0), teamsInserted.get(3), 3, this));
		addGame(new GroupGame(teamsInserted.get(3), teamsInserted.get(1), 4, this));
		addGame(new GroupGame(teamsInserted.get(2), teamsInserted.get(0), 4, this));

	}

}
