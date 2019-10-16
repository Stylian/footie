package gr.manolis.stelios.footie.api.dtos;

import gr.manolis.stelios.footie.core.peristence.dtos.Trophy;

import java.util.List;

public class PlayerDTO {

    private int id;
    private String name;
    private TeamSimpleDTO team;
    private List<Trophy> trophies;
    private int dreamTeamTrophies;
    private int playerOfTheYearTrophies;


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

    public TeamSimpleDTO getTeam() {
        return team;
    }

    public void setTeam(TeamSimpleDTO team) {
        this.team = team;
    }

    public List<Trophy> getTrophies() {
        return trophies;
    }

    public void setTrophies(List<Trophy> trophies) {
        this.trophies = trophies;
    }

    public int getDreamTeamTrophies() {
        return dreamTeamTrophies;
    }

    public void setDreamTeamTrophies(int dreamTeamTrophies) {
        this.dreamTeamTrophies = dreamTeamTrophies;
    }

    public int getPlayerOfTheYearTrophies() {
        return playerOfTheYearTrophies;
    }

    public void setPlayerOfTheYearTrophies(int playerOfTheYearTrophies) {
        this.playerOfTheYearTrophies = playerOfTheYearTrophies;
    }
}
