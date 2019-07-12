package gr.manolis.stelios.footie.api.mappers;

import gr.manolis.stelios.footie.api.dtos.TeamSimpleDTO;
import gr.manolis.stelios.footie.core.EntityMapper;
import gr.manolis.stelios.footie.core.peristence.dtos.Team;
import org.mapstruct.Mapper;


@Mapper(componentModel = "spring")
public interface TeamSimpleMapper extends EntityMapper<TeamSimpleDTO, Team>{
}
