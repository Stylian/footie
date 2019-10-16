package gr.manolis.stelios.footie.api.dtos;

import gr.manolis.stelios.footie.core.peristence.dtos.games.Game;

import java.util.List;

public class RobinGroupDTO {

    private int id;
    private String name;
    private List<TeamGroupDTO> teams;
    private List<GameDTO> games;
    private int round;
    private int seasonNum;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<TeamGroupDTO> getTeams() {
        return teams;
    }

    public void setTeams(List<TeamGroupDTO> teams) {
        this.teams = teams;
    }

    public List<GameDTO> getGames() {
        return games;
    }

    public void setGames(List<GameDTO> games) {
        this.games = games;
    }

    public int getRound() {
        return round;
    }

    public void setRound(int round) {
        this.round = round;
    }

    public int getSeasonNum() {
        return seasonNum;
    }

    public void setSeasonNum(int seasonNum) {
        this.seasonNum = seasonNum;
    }
}
