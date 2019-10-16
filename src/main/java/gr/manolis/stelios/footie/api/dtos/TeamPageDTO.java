package gr.manolis.stelios.footie.api.dtos;

import gr.manolis.stelios.footie.core.peristence.dtos.Player;
import gr.manolis.stelios.footie.core.peristence.dtos.Stats;
import gr.manolis.stelios.footie.core.peristence.dtos.Trophy;

import java.util.List;

public class TeamPageDTO {

    private int id;
    private String name;
    private Stats completeStats;
    private List<Stats> seasonsStats;
    private List<Trophy> trophies;
    private List<PlayerDTO> players;

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

    public Stats getCompleteStats() {
        return completeStats;
    }

    public void setCompleteStats(Stats completeStats) {
        this.completeStats = completeStats;
    }

    public List<Stats> getSeasonsStats() {
        return seasonsStats;
    }

    public void setSeasonsStats(List<Stats> seasonsStats) {
        this.seasonsStats = seasonsStats;
    }

    public List<Trophy> getTrophies() {
        return trophies;
    }

    public void setTrophies(List<Trophy> trophies) {
        this.trophies = trophies;
    }

    public List<PlayerDTO> getPlayers() {
        return players;
    }

    public void setPlayers(List<PlayerDTO> players) {
        this.players = players;
    }
}
