package gr.manolis.stelios.footie.api.tools;

import gr.manolis.stelios.footie.api.dtos.PlayerDTO;
import gr.manolis.stelios.footie.api.dtos.TeamWithTrophiesDTO;

import java.util.Comparator;

public class PlayersWithTrophiesOrdering  implements Comparator<PlayerDTO> {

    @Override
    public int compare(PlayerDTO o1, PlayerDTO o2) {

        if(o1.getPlayerOfTheYearTrophies() != o2.getPlayerOfTheYearTrophies()) {
            return o2.getPlayerOfTheYearTrophies() - o1.getPlayerOfTheYearTrophies();
        }

        return o2.getDreamTeamTrophies() - o1.getDreamTeamTrophies();
    }
}
