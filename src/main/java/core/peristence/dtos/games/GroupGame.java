package core.peristence.dtos.games;

import javax.persistence.CascadeType;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;

import core.peristence.dtos.Team;
import core.peristence.dtos.groups.RobinGroup;

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

	public RobinGroup getRobinGroup() {
		return robinGroup;
	}
	
}
