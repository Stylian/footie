package gr.manolis.stelios.footie.api.dtos;

import gr.manolis.stelios.footie.core.peristence.dtos.Team;
import gr.manolis.stelios.footie.core.peristence.dtos.games.Result;

import javax.persistence.*;

public class GameDTO {

    private int id;
    private TeamSimpleDTO homeTeam;
    private TeamSimpleDTO awayTeam;
    private Result result;
    private int day;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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

    public Result getResult() {
        return result;
    }

    public void setResult(Result result) {
        this.result = result;
    }

    public int getDay() {
        return day;
    }

    public void setDay(int day) {
        this.day = day;
    }
}
