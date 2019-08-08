package gr.manolis.stelios.footie.core.peristence.dtos.groups;

import java.util.List;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

import gr.manolis.stelios.footie.core.peristence.dtos.Team;
import gr.manolis.stelios.footie.core.peristence.dtos.games.GroupGame;

@Entity
@DiscriminatorValue(value = "R12")
public class RobinGroup12 extends RobinGroup {

	public RobinGroup12() {
	}

	public RobinGroup12(String name) {
		super(name);
	}

	public void buildGames() {

		List<Team> teams = getTeams();

		addGame(new GroupGame(teams.get(0), teams.get(2), 1, this));
		addGame(new GroupGame(teams.get(1), teams.get(0), 1, this));
		addGame(new GroupGame(teams.get(2), teams.get(1), 2, this));
		addGame(new GroupGame(teams.get(0), teams.get(1), 2, this));
		addGame(new GroupGame(teams.get(1), teams.get(2), 3, this));
		addGame(new GroupGame(teams.get(2), teams.get(0), 3, this));

	}

}
