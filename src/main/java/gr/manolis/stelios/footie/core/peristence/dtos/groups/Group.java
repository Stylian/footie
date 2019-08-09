package gr.manolis.stelios.footie.core.peristence.dtos.groups;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import gr.manolis.stelios.footie.core.Utils;
import gr.manolis.stelios.footie.core.peristence.dtos.Stats;
import gr.manolis.stelios.footie.core.peristence.dtos.Team;
import org.apache.commons.collections4.ListUtils;

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

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinColumn(name="TEAMS_ORDERED")
	private List<Team> teams;

	public Group() {
	}

	public Group(Map<Team, Stats> teamsStats) {
		this.teamsStats = teamsStats;
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

	public List<Team> getTeams1() {
		return new ArrayList<>(teamsStats.keySet());
	}

	public List<Team> getTeams() {
		if(teams == null || teams.size() < teamsStats.size()) {
			teams = getTeams1();
		}
		return teams;
	}

	@Override
	public String toString() {
		return "Group [name=" + name + ", teams=" + Utils.toString(getTeams()) + "]";
	}

}
