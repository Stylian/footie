package gr.manolis.stelios.footie.api.mappers;

import gr.manolis.stelios.footie.api.dtos.TeamGroupDTO;
import gr.manolis.stelios.footie.core.EntityMapper;
import gr.manolis.stelios.footie.core.peristence.dtos.Team;
import org.mapstruct.Mapper;


@Mapper(componentModel = "spring")
public interface TeamGroupMapper extends EntityMapper<TeamGroupDTO, Team> {


}
