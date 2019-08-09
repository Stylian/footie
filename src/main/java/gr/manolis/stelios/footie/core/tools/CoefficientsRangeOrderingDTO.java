package gr.manolis.stelios.footie.core.tools;

import gr.manolis.stelios.footie.api.dtos.TeamCoeffsDTO;
import gr.manolis.stelios.footie.core.Utils;
import gr.manolis.stelios.footie.core.peristence.dtos.Stats;
import gr.manolis.stelios.footie.core.peristence.dtos.Team;
import gr.manolis.stelios.footie.core.peristence.dtos.groups.Season;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Map;

public class CoefficientsRangeOrderingDTO implements Comparator<TeamCoeffsDTO> {

    @Override
    public int compare(TeamCoeffsDTO o1, TeamCoeffsDTO o2) {

        int p1 = o1.getCoefficients();
        int p2 = o2.getCoefficients();

        // compare by coeffs
        if( p1 != p2) {
            return p2 - p1;
        }

        // alphabetical
        return o1.getName().compareTo(o2.getName());
    }
}
