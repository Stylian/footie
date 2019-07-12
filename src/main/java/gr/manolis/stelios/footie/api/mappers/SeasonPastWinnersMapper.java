package gr.manolis.stelios.footie.api.mappers;

import gr.manolis.stelios.footie.api.dtos.SeasonPastWinnersDTO;
import gr.manolis.stelios.footie.core.EntityMapper;
import gr.manolis.stelios.footie.core.peristence.dtos.groups.Season;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface SeasonPastWinnersMapper extends EntityMapper<SeasonPastWinnersDTO, Season> {
}
