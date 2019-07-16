package gr.manolis.stelios.footie.api.dtos;

import gr.manolis.stelios.footie.core.peristence.dtos.Stats;

public class TeamGroupDTO extends TeamSimpleDTO {

    private Stats stats;

    public Stats getStats() {
        return stats;
    }

    public void setStats(Stats stats) {
        this.stats = stats;
    }

}
