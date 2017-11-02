package main.java.dtos.groups;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;

import main.java.dtos.Team;
import main.java.dtos.games.GroupGame;
import main.java.tools.RobinGroupOrdering;

@Entity
@DiscriminatorValue(value = "R")
public class RobinGroup extends Group {

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<GroupGame> games;

	public RobinGroup() {
	}
	
	public RobinGroup(String name) {
		super(name);
		games = new ArrayList<>();
	}

	public List<GroupGame> getGames() {
		return games;
	}

	public void addGame(GroupGame game) {
		games.add(game);
	}

	public void addGames(List<GroupGame> newGames) {
		games.addAll(newGames);
	}

	/**
	 * teams in robin group come ordered
	 */
	@Override
	public List<Team> getTeams() {
		
		List<Team> teams = super.getTeams();

		Collections.sort(teams, new RobinGroupOrdering(this));
	
		return teams;
		
	}


	public void buildGames() {
		// to extend
	};
	
}
