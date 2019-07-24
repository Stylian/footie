package gr.manolis.stelios.footie.api.mappers;

import gr.manolis.stelios.footie.api.dtos.TeamWithTrophiesDTO;
import gr.manolis.stelios.footie.core.EntityMapper;
import gr.manolis.stelios.footie.core.peristence.dtos.Team;
import gr.manolis.stelios.footie.core.peristence.dtos.Trophy;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;


@Mapper(componentModel = "spring")
public abstract class TeamWithTrophiesMapper implements EntityMapper<TeamWithTrophiesDTO, Team> {


    @AfterMapping
    void afterMapping(@MappingTarget TeamWithTrophiesDTO teamWithTrophiesDTO, Team team) {

        int gold = 0;
        int silver = 0;
        for(Trophy trophy: team.getTrophies()) {
            if(trophy.getType().equals(Trophy.WINNER)) {
                gold ++;
            }else {
                silver ++;
            }
        }

        teamWithTrophiesDTO.setGold(gold);
        teamWithTrophiesDTO.setSilver(silver);
    }

}
