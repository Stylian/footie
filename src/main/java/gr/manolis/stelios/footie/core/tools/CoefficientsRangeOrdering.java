package gr.manolis.stelios.footie.core.tools;

import gr.manolis.stelios.footie.core.Utils;
import gr.manolis.stelios.footie.core.peristence.dtos.Stats;
import gr.manolis.stelios.footie.core.peristence.dtos.Team;
import gr.manolis.stelios.footie.core.peristence.dtos.groups.Season;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Map;

public class CoefficientsRangeOrdering implements Comparator<Team> {

    private List<Season> seasons;
    private int seasonUntil;

    public CoefficientsRangeOrdering(List<Season> seasons, int seasonUntil) {
        this.seasons = seasons;
        this.seasonUntil = seasonUntil;
    }

    @Override
    public int compare(Team o1, Team o2) {

        int p1 = Utils.getCoefficientsUntilSeason(seasons, o1, seasonUntil);
        int p2 = Utils.getCoefficientsUntilSeason(seasons, o2, seasonUntil);

        // compare by coeffs
        if( p1 != p2) {
            return p2 - p1;
        }

        // alphabetical
        return o1.getName().compareTo(o2.getName());
    }
}
