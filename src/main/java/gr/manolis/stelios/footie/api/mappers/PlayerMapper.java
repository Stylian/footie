package gr.manolis.stelios.footie.api.mappers;

import gr.manolis.stelios.footie.api.dtos.PlayerDTO;
import gr.manolis.stelios.footie.core.EntityMapper;
import gr.manolis.stelios.footie.core.peristence.dtos.Player;
import gr.manolis.stelios.footie.core.peristence.dtos.Trophy;
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

        int dreamTeamTrophies = 0;
        int playerOfTheYearTrophies = 0;
        for(Trophy trophy: player.getTrophies()) {
            if(trophy.getType().equals(Trophy.DREAM_TEAM)) {
                dreamTeamTrophies++;
            }else if(trophy.getType().equals(Trophy.PLAYER_OF_THE_YEAR)) {
                playerOfTheYearTrophies++;
            }
        }
        playerDTO.setDreamTeamTrophies(dreamTeamTrophies);
        playerDTO.setPlayerOfTheYearTrophies(playerOfTheYearTrophies);
    }
}
