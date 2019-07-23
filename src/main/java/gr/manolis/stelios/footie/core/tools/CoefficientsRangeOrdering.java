package gr.manolis.stelios.footie.core.tools;

import gr.manolis.stelios.footie.core.peristence.dtos.Stats;
import gr.manolis.stelios.footie.core.peristence.dtos.Team;
import gr.manolis.stelios.footie.core.peristence.dtos.groups.Season;

import java.util.Comparator;
import java.util.List;
import java.util.Map;

public class CoefficientsRangeOrdering implements Comparator<Team> {

    private List<Season> seasons;

    public CoefficientsRangeOrdering(List<Season> seasons) {
        this.seasons = seasons;
    }

    @Override
    public int compare(Team o1, Team o2) {

        int p1 = 0;
        int p2 = 0;

        for(Season season : seasons) {
            p1 += o1.getStatsForGroup(season).getPoints();
            p2 += o2.getStatsForGroup(season).getPoints();
        }

        // compare by coeffs
        if( p1 != p2) {
            return p2 - p1;
        }

        // alphabetical
        return o1.getName().compareTo(o2.getName());
    }
}
