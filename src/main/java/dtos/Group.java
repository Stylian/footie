package main.java.dtos;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;

@Entity(name = "GROUPS")
public class Group {

	@Id
	@GeneratedValue
	@Column(name = "ID")
	private int id;

	@Column(name = "NAME")
	private String name;
	
	@ManyToMany(cascade = CascadeType.ALL)
	private Map<Team, Stats> teamsStats;

	@ManyToMany(cascade = CascadeType.ALL)
	private List<Game> games;

	public Group() {
		teamsStats = new HashMap<>();
		games = new ArrayList<>();
	}
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
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

	public Map<Team, Stats> getTeamsStats() {
		return teamsStats;
	}

	public void addTeamStats(Team team, Stats stats) {
		teamsStats.put(team, stats);
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Override
	public String toString() {
		return "Group [id=" + id + ", name=" + name + ", teamsStats=" + teamsStats.size() + ", games=" + games.size() + "]";
	}

}
