package gr.manolis.stelios.footie.core.peristence.dtos;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity(name = "PLAYERS")
public class Player {

    @Id
    @GeneratedValue
    @Column(name = "ID")
    private int id;

    @Column(name = "NAME", unique = true)
    private String name;

    @ManyToOne(cascade = CascadeType.ALL)
    private Team team;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "player")
    private List<Trophy> trophies;

    public Player()  {
        trophies = new ArrayList<>();
    }

    public Player(String name, Team team) {
        this();
        this.name = name;
        this.team = team;
        team.addPlayer(this);
    }

    public void addTrophy(Trophy trophy) {
        trophies.add(trophy);
    }

    public List<Trophy> getTrophies() {
        return trophies;
    }

    public void setTrophies(List<Trophy> trophies) {
        this.trophies = trophies;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Team getTeam() {
        return team;
    }

    public void setTeam(Team team) {
        this.team = team;
    }
}
