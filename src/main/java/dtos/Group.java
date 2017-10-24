package main.java.dtos;

import java.util.HashMap;
import java.util.Map;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.DiscriminatorColumn;
import javax.persistence.DiscriminatorType;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.OneToMany;

@Entity(name = "GROUPS")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "discriminator", discriminatorType = DiscriminatorType.STRING)
@DiscriminatorValue(value = "G")
public class Group {

	@Id
	@GeneratedValue
	@Column(name = "ID")
	private int id;

	// must send to subclass for RoundGroups
	@Column(name = "NAME")
	protected String name;

	@OneToMany(cascade = CascadeType.ALL)
	private Map<Team, Stats> teamsStats;

	// must send to subclass for RoundGroups
	// @OneToMany(cascade = CascadeType.ALL)
	// private List<Game> games;

	public Group() {
	}
	
	public Group(String name) {
		this.name = name;
		
		teamsStats = new HashMap<>();
		// games = new ArrayList<>();
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	// public List<Game> getGames() {
	// return games;
	// }
	//
	// public void addGame(Game game) {
	// games.add(game);
	// }
	//
	// public void addGames(List<Game> newGames) {
	// games.addAll(newGames);
	// }

	public Map<Team, Stats> getTeamsStats() {
		return teamsStats;
	}

	public void addTeamStats(Team team, Stats stats) {
		teamsStats.put(team, stats);
	}

	public String getName() {
		return name;
	}

	@Override
	public String toString() {
		return "Group [id=" + id + ", name=" + name + ", teamsStats=" + teamsStats.size() + "";
	}

}
