package gr.manolis.stelios.footie.core.peristence.dtos;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

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

    public Trophy() { }

    public Trophy(int seasonNum, String type) {
        this.seasonNum = seasonNum;
        this.type = type;
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
}
