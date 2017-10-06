package main.java.dtos;

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

	@ManyToMany(cascade = CascadeType.ALL)
	private Map<Team, Stats> teamsWithStats;

	@ManyToMany(cascade = CascadeType.ALL)
	private List<Game> games;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public List<Game> getGames() {
		return games;
	}

	public void setGames(List<Game> games) {
		this.games = games;
	}

	public Map<Team, Stats> getTeamsWithStats() {
		return teamsWithStats;
	}

	public void setTeamsWithStats(Map<Team, Stats> teamsStats) {
		this.teamsWithStats = teamsStats;
	}

	@Override
	public String toString() {
		return "Group [id=" + id + ", teamsStats=" + teamsWithStats + ", games=" + games + "]";
	}

}
