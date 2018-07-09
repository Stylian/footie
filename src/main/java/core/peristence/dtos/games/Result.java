package core.peristence.dtos.games;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

/**
 * TODO could be made unique goals pair
 * @author stylianos.chatzimano
 *
 */
@Entity(name = "RESULTS")
public class Result {

	@Id
	@GeneratedValue
	@Column(name = "ID")
	private int id;

	@Column(name = "HOME_GOALS")
	private int goalsMadeByHomeTeam;

	@Column(name = "AWAY_GOALS")
	private int goalsMadeByAwayTeam;

	public Result() {
	}
	
	public Result(int goalsMadeByHomeTeam, int goalsMadeByAwayTeam) {
		this.goalsMadeByHomeTeam = goalsMadeByHomeTeam;
		this.goalsMadeByAwayTeam = goalsMadeByAwayTeam;
	}
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public boolean homeTeamWon() {
		return goalsMadeByHomeTeam > goalsMadeByAwayTeam;
	}

	public boolean awayTeamWon() {
		return goalsMadeByHomeTeam < goalsMadeByAwayTeam;
	}

	public boolean tie() {
		return goalsMadeByHomeTeam == goalsMadeByAwayTeam;
	}

	public int getGoalsMadeByHomeTeam() {
		return goalsMadeByHomeTeam;
	}

	public void setGoalsMadeByHomeTeam(int goalsMadeByHomeTeam) {
		this.goalsMadeByHomeTeam = goalsMadeByHomeTeam;
	}

	public int getGoalsMadeByAwayTeam() {
		return goalsMadeByAwayTeam;
	}

	public void setGoalsMadeByAwayTeam(int goalsMadeByAwayTeam) {
		this.goalsMadeByAwayTeam = goalsMadeByAwayTeam;
	}

	@Override
	public String toString() {
		return goalsMadeByHomeTeam + " - " + goalsMadeByAwayTeam;
	}

}
