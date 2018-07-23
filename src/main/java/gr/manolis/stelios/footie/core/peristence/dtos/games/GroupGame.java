package gr.manolis.stelios.footie.core.peristence.dtos.games;

import javax.persistence.CascadeType;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import gr.manolis.stelios.footie.core.peristence.dtos.Team;
import gr.manolis.stelios.footie.core.peristence.dtos.groups.RobinGroup;

@Entity
@DiscriminatorValue(value = "GG")
public class GroupGame extends Game {

	@ManyToOne(cascade = CascadeType.ALL)
	private RobinGroup robinGroup;
	
	public GroupGame() {
	}
	
	public GroupGame(Team homeTeam, Team awayTeam, RobinGroup robinGroup) {
		super(homeTeam, awayTeam);
		this.robinGroup = robinGroup;
	}

	@JsonIgnore
	public RobinGroup getRobinGroup() {
		return robinGroup;
	}
	
}
