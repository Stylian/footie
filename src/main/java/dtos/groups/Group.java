package main.java.dtos.groups;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.DiscriminatorColumn;
import javax.persistence.DiscriminatorType;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.OneToMany;

import main.java.Utils;
import main.java.dtos.Stats;
import main.java.dtos.Team;

@Entity(name = "GROUPS")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "discriminator", discriminatorType = DiscriminatorType.STRING)
@DiscriminatorValue(value = "G")
public class Group {

	@Id
	@GeneratedValue
	@Column(name = "ID")
	private int id;

	@Column(name = "NAME")
	protected String name;

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private Map<Team, Stats> teamsStats;

	public Group() {
	}
	
	public Group(String name) {
		this.name = name;
		
		teamsStats = new HashMap<>();
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Map<Team, Stats> getTeamsStats() {
		return teamsStats;
	}

	public String getName() {
		return name;
	}

	public void addTeam(Team team) {
		
		teamsStats.put(team, new Stats(this, team));
		
	}
	
	public List<Team> getTeams() {
		return new ArrayList<>(teamsStats.keySet());
	}

	@Override
	public String toString() {
		return "Group [name=" + name + ", teams=" + Utils.toString(getTeams()) + "]";
	}


}
