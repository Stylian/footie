package gr.manolis.stelios.footie.api.mappers;

import gr.manolis.stelios.footie.api.dtos.GameDTO;
import gr.manolis.stelios.footie.api.dtos.MatchupGameDTO;
import gr.manolis.stelios.footie.core.EntityMapper;
import gr.manolis.stelios.footie.core.peristence.dtos.games.Game;
import gr.manolis.stelios.footie.core.peristence.dtos.games.MatchupGame;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.springframework.beans.factory.annotation.Autowired;

@Mapper(componentModel = "spring")
public abstract class GameMapper implements EntityMapper<GameDTO, Game> {

    @Autowired
    TeamSimpleMapper teamSimpleMapper;

    @AfterMapping
    void afterMapping(@MappingTarget GameDTO gameDTO, Game game) {
        gameDTO.setHomeTeam(teamSimpleMapper.toDTO(game.getHomeTeam()));
        gameDTO.setAwayTeam(teamSimpleMapper.toDTO(game.getAwayTeam()));
    }
}
