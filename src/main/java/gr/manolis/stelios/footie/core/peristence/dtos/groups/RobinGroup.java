package gr.manolis.stelios.footie.core.peristence.dtos.groups;

import gr.manolis.stelios.footie.core.peristence.dtos.Team;
import gr.manolis.stelios.footie.core.peristence.dtos.games.GroupGame;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity(name = "GROUPS_ROBINGROUP")
@DiscriminatorValue(value = "R")
public class RobinGroup extends Group {

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<GroupGame> games;

    @ManyToOne(cascade = CascadeType.ALL)
    private Season season;

    public RobinGroup() {
    }

    public RobinGroup(String name, Season season) {
        super(name);
        this.season = season;
        games = new ArrayList<>();
    }

    public List<GroupGame> getGames() {
        return games;
    }

    public void addGame(GroupGame game) {
        games.add(game);
    }

    public void buildGames() {
        // to extend
    }

    public Season getSeason() {
        return season;
    }
}
