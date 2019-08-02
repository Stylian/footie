package gr.manolis.stelios.footie.api.dtos;

public class SeasonPastWinnersDTO {
    private int seasonYear;
    private TeamSimpleDTO winner;
    private TeamSimpleDTO runnerUp;
    private TeamSimpleDTO semifinalist1;
    private TeamSimpleDTO semifinalist2;

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

    public TeamSimpleDTO getSemifinalist1() {
        return semifinalist1;
    }

    public void setSemifinalist1(TeamSimpleDTO semifinalist1) {
        this.semifinalist1 = semifinalist1;
    }

    public TeamSimpleDTO getSemifinalist2() {
        return semifinalist2;
    }

    public void setSemifinalist2(TeamSimpleDTO semifinalist2) {
        this.semifinalist2 = semifinalist2;
    }
}
