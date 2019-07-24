package gr.manolis.stelios.footie.api.tools;

import gr.manolis.stelios.footie.api.dtos.TeamWithTrophiesDTO;

import java.util.Comparator;

public class TeamsWithTrophiesOrdering implements Comparator<TeamWithTrophiesDTO> {

    @Override
    public int compare(TeamWithTrophiesDTO o1, TeamWithTrophiesDTO o2) {

        if(o1.getGold() != o2.getGold()) {
            return o2.getGold() - o1.getGold();
        }

        return o2.getSilver() - o1.getSilver();
    }
}
