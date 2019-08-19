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

@Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public abstract class Group {

	@Id
	@GeneratedValue(strategy = GenerationType.TABLE)
	@Column(name = "ID")
	private int id;

	@Column(name = "NAME")
	protected String name;

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "group")
	private List<Stats> stats = new ArrayList<>();

	private transient List<Team> teamsOrdered;

	public Group() {
	}

	public Group(String name) {
		this.name = name;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Map<Team, Stats> getTeamsStats() {
		Map<Team, Stats> teamsStats = new HashMap<>();
		for(Stats stat : stats) {
			teamsStats.put(stat.getTeam(), stat);
		}
		return teamsStats;
	}

	public String getName() {
		return name;
	}

	public void addTeam(Team team) {
		new Stats(this, team);
	}

	public List<Team> getTeams() {
		if(teamsOrdered != null) {
			return teamsOrdered;
		}else {
			teamsOrdered = new ArrayList<>(getTeamsStats().keySet());
		}
		return teamsOrdered;
	}

	public void addStats(Stats stat) {
		stats.add(stat);
	}

	@Override
	public String toString() {
		return "Group [name=" + name + ", teams=" + Utils.toString(getTeams()) + "]";
	}

}
