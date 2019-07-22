package gr.manolis.stelios.footie.api.dtos;

import gr.manolis.stelios.footie.core.peristence.dtos.games.Game;

import java.util.List;

public class RobinGroupDTO {

    private int id;
    private String name;
    private List<TeamGroupDTO> teams;
    private List<Game> games;
    private int round;

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

    public List<Game> getGames() {
        return games;
    }

    public void setGames(List<Game> games) {
        this.games = games;
    }

    public int getRound() {
        return round;
    }

    public void setRound(int round) {
        this.round = round;
    }
}
