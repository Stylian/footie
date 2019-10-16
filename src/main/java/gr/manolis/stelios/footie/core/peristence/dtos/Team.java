package gr.manolis.stelios.footie.core.peristence.dtos;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import gr.manolis.stelios.footie.core.peristence.dtos.groups.Group;
import gr.manolis.stelios.footie.core.peristence.dtos.groups.Season;

@Entity(name = "TEAMS")
public class Team {

	@Id
	@GeneratedValue
	@Column(name = "ID")
	private int id;

	@Column(name = "NAME", unique = true)
	private String name;

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "team")
	private List<Stats> stats = new ArrayList<>();

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "team")
	private List<Trophy> trophies;

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "team")
	private List<Player> players = new ArrayList<>();

	public Team() {
		trophies = new ArrayList<>();
	}

	public Team(String name) {
		this();
		this.name = name;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Stats getStatsForGroup(Group group) {

		for(Stats stat : stats) {
			if(group.equals(stat.getGroup())) {
				return stat;
			}
		}

		return new Stats();
	}

	public Stats getAllStats() {

		List<Season> seasons = new ArrayList<>();
		Stats stats1 = new Stats();
		for(Stats stat : stats) {
			if(stat.getGroup() instanceof Season) {
				seasons.add( (Season) stat.getGroup());
				stats1.addStats(stat);
			}
		}
		stats1.setElo( this.getStatsForGroup(seasons.get(seasons.size()-1)).getElo() );

		return stats1;
	}

	public void addStats(Stats stat) {
		stats.add(stat);
	}

	public void addTrophy(Trophy trophy) {
		trophies.add(trophy);
	}

	public List<Trophy> getTrophies() {
		return trophies;
	}

	public void setTrophies(List<Trophy> trophies) {
		this.trophies = trophies;
	}

	public List<Player> getPlayers() {
		return players;
	}

	public void addPlayer(Player player) {
		players.add(player);
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((name == null) ? 0 : name.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Team other = (Team) obj;
		if (name == null) {
			if (other.name != null)
				return false;
		} else if (!name.equals(other.name))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return name;
	}

}
