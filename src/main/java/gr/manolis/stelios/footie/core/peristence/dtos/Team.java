package gr.manolis.stelios.footie.core.peristence.dtos;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import gr.manolis.stelios.footie.core.peristence.dtos.groups.Group;

@Entity(name = "TEAMS")
public class Team {

	@Id
	@GeneratedValue
	@Column(name = "ID")
	private int id;

	@Column(name = "NAME", unique = true)
	private String name;

	@ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private Map<Group, Stats> groupStats;

	@Column(name = "TROPHIES")
	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<Trophy> trophies;

	public Team() {
		groupStats = new HashMap<>();
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

	@JsonIgnore
	public Map<Group, Stats> getGroupStats() {
		return groupStats;
	}

	public void addGroupStats(Group group, Stats stats) {
		groupStats.put(group, stats);
	}

	public Stats getStatsForGroup(Group group) {
		return groupStats.get(group);
	}

	public Stats setStatsForGroup(Group group, Stats stats) {
		return groupStats.put(group, stats);
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
