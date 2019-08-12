package gr.manolis.stelios.footie.core.peristence.dtos.rounds;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import gr.manolis.stelios.footie.core.peristence.dtos.Team;
import gr.manolis.stelios.footie.core.peristence.dtos.games.Game;
import gr.manolis.stelios.footie.core.peristence.dtos.groups.RobinGroup;
import gr.manolis.stelios.footie.core.peristence.dtos.groups.Season;

@Entity(name = "ROUNDS_GROUPROUNDS")
public class GroupsRound extends Round {

	@OneToMany(fetch = FetchType.LAZY)
	private List<RobinGroup> groups = new ArrayList<>();

	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "GROUPS_STRONG_TEAMS")
	private List<Team> strongTeams;

	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "GROUPS_MEDIUM_TEAMS")
	private List<Team> mediumTeams;

	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "GROUPS_WEAK_TEAMS")
	private List<Team> weakTeams;

	public GroupsRound() {
	}

	public GroupsRound(Season season, String name, int num) {
		super(season, name, num);
	}

	@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
	public List<Team> getStrongTeams() {
		return strongTeams;
	}

	public void setStrongTeams(List<Team> strongTeams) {
		this.strongTeams = strongTeams;
	}

	@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
	public List<Team> getMediumTeams() {
		return mediumTeams;
	}

	public void setMediumTeams(List<Team> mediumTeams) {
		this.mediumTeams = mediumTeams;
	}

	@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
	public List<Team> getWeakTeams() {
		return weakTeams;
	}

	public void setWeakTeams(List<Team> weakTeams) {
		this.weakTeams = weakTeams;
	}

	@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
	public List<RobinGroup> getGroups() {
		return groups;
	}

	public void addGroup(RobinGroup group) {
		this.groups.add(group);
	}

	@Override
	public List<Game> getGames() {
		List<Game> games = new ArrayList<>();
		groups.stream().forEach( g -> games.addAll(g.getGames())); 
		return games;
	}

}
