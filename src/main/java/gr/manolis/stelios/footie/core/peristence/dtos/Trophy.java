package gr.manolis.stelios.footie.core.peristence.dtos;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity(name = "TROPHIES")
public class Trophy {

    public static final String WINNER = "W";
    public static final String RUNNER_UP = "R";

    @Id
    @GeneratedValue
    @Column(name = "ID")
    private int id;

    @Column(name = "SEASON_NUM")
    private int seasonNum;

    @Column(name = "TROPHY_TYPE")
    private String type;

    @ManyToOne(cascade = CascadeType.ALL)
    @JsonIgnore
    private Team team;

    public Trophy() { }

    public Trophy(int seasonNum, String type, Team team) {
        this.seasonNum = seasonNum;
        this.type = type;
        this.team = team;
    }

    public int getSeasonNum() {
        return seasonNum;
    }

    public void setSeasonNum(int seasonNum) {
        this.seasonNum = seasonNum;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Team getTeam() {
        return team;
    }

    public void setTeam(Team team) {
        this.team = team;
    }
}
