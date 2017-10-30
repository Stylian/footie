package main.java.dtos.rounds;

import java.util.List;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;

import main.java.dtos.Season;
import main.java.dtos.Team;

@Entity
@DiscriminatorValue(value = "G")
public class GroupsRound extends Round {

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

	public GroupsRound(Season season, String name) {
		super(season, name);
	}

	public List<Team> getStrongTeams() {
		return strongTeams;
	}

	public void setStrongTeams(List<Team> strongTeams) {
		this.strongTeams = strongTeams;
	}

	public List<Team> getMediumTeams() {
		return mediumTeams;
	}

	public void setMediumTeams(List<Team> mediumTeams) {
		this.mediumTeams = mediumTeams;
	}

	public List<Team> getWeakTeams() {
		return weakTeams;
	}

	public void setWeakTeams(List<Team> weakTeams) {
		this.weakTeams = weakTeams;
	}

}
