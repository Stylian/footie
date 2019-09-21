package gr.manolis.stelios.footie.api.mappers;

import gr.manolis.stelios.footie.api.dtos.PlayerDTO;
import gr.manolis.stelios.footie.core.EntityMapper;
import gr.manolis.stelios.footie.core.peristence.dtos.Player;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.springframework.beans.factory.annotation.Autowired;

@Mapper(componentModel = "spring")
public abstract class PlayerMapper implements EntityMapper<PlayerDTO, Player> {

    @Autowired
    TeamSimpleMapper teamSimpleMapper;

    @AfterMapping
    void afterMapping(@MappingTarget PlayerDTO playerDTO, Player player) {
        playerDTO.setTeam(teamSimpleMapper.toDTO(player.getTeam()));
    }
}
