package gr.manolis.stelios.footie.api.mappers;


import gr.manolis.stelios.footie.api.dtos.TeamPageDTO;
import gr.manolis.stelios.footie.api.dtos.TeamWithTrophiesDTO;
import gr.manolis.stelios.footie.core.EntityMapper;
import gr.manolis.stelios.footie.core.peristence.dtos.Team;
import gr.manolis.stelios.footie.core.peristence.dtos.Trophy;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.springframework.beans.factory.annotation.Autowired;

@Mapper(componentModel = "spring")
public abstract class TeamPageMapper implements EntityMapper<TeamPageDTO, Team> {

    @Autowired
    PlayerMapper playerMapper;

    @AfterMapping
    void afterMapping(@MappingTarget TeamPageDTO teamPageDTO, Team team) {
        teamPageDTO.setPlayers(playerMapper.toDTO(team.getPlayers()));
    }

}
