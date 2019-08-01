package gr.manolis.stelios.footie.api.mappers;

import gr.manolis.stelios.footie.api.dtos.MatchupGameDTO;
import gr.manolis.stelios.footie.core.EntityMapper;
import gr.manolis.stelios.footie.core.peristence.dtos.games.Game;
import gr.manolis.stelios.footie.core.peristence.dtos.games.MatchupGame;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.springframework.beans.factory.annotation.Autowired;

@Mapper(componentModel = "spring")
public abstract class MatchupGameMapper implements EntityMapper<MatchupGameDTO, Game> {

    @Autowired
    TeamSimpleMapper teamSimpleMapper;

        @AfterMapping
        void afterMapping(@MappingTarget MatchupGameDTO matchupGameDTO, Game game) {
            if(game instanceof MatchupGame) {
                MatchupGame mg = (MatchupGame) game;
                if(mg.getMatchup().getWinner() != null) {
                    matchupGameDTO.setWinner(teamSimpleMapper.toDTO(mg.getMatchup().getWinner()));
                }
            }
        }
}
