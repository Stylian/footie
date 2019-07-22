package gr.manolis.stelios.footie.api.dtos;

public class GameDTO {

    private TeamSimpleDTO homeTeam;
    private TeamSimpleDTO awayTeam;
    private int gs;
    private int gc;
    private int day;

    public GameDTO() {
    }

    public TeamSimpleDTO getHomeTeam() {
        return homeTeam;
    }

    public void setHomeTeam(TeamSimpleDTO homeTeam) {
        this.homeTeam = homeTeam;
    }

    public TeamSimpleDTO getAwayTeam() {
        return awayTeam;
    }

    public void setAwayTeam(TeamSimpleDTO awayTeam) {
        this.awayTeam = awayTeam;
    }

    public int getGs() {
        return gs;
    }

    public void setGs(int gs) {
        this.gs = gs;
    }

    public int getGc() {
        return gc;
    }

    public void setGc(int gc) {
        this.gc = gc;
    }

    public int getDay() {
        return day;
    }

    public void setDay(int day) {
        this.day = day;
    }
}
