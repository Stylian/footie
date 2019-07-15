package gr.manolis.stelios.footie.api.dtos;

public class SeasonPastWinnersDTO {
    private int seasonYear;
    private TeamSimpleDTO winner;
    private TeamSimpleDTO runnerUp;

    public int getSeasonYear() {
        return seasonYear;
    }

    public void setSeasonYear(int seasonYear) {
        this.seasonYear = seasonYear;
    }

    public TeamSimpleDTO getWinner() {
        return winner;
    }

    public void setWinner(TeamSimpleDTO winner) {
        this.winner = winner;
    }

    public TeamSimpleDTO getRunnerUp() {
        return runnerUp;
    }

    public void setRunnerUp(TeamSimpleDTO runnerUp) {
        this.runnerUp = runnerUp;
    }

}
