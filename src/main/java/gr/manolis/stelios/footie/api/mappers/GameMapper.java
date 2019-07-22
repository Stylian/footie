package gr.manolis.stelios.footie.api.mappers;

import gr.manolis.stelios.footie.api.dtos.GameDTO;
import gr.manolis.stelios.footie.core.EntityMapper;
import gr.manolis.stelios.footie.core.peristence.dtos.games.Game;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public abstract class GameMapper implements EntityMapper<GameDTO, Game> {


    @AfterMapping
    void setGame(@MappingTarget GameDTO gameDTO, Game game) {

        if(game.getResult() != null) {
            gameDTO.setGs(game.getResult().getGoalsMadeByHomeTeam());
            gameDTO.setGc(game.getResult().getGoalsMadeByAwayTeam());
        }else {
            gameDTO.setGs(-1);
            gameDTO.setGc(-1);
        }

        gameDTO.setDay(game.getDay()); // why need this ?

    }

}
