package main.java.dtos;

public class Result {

	private int goalsMadeByHomeTeam;
	private int goalsMadeByAwayTeam;

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

}
