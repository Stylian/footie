package gr.manolis.stelios.footie.api.dtos;

import java.util.List;

public class RobinGroupDTO {

    private int id;
    private String name;
    private List<TeamGroupDTO> teams;

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

}
