package gr.manolis.stelios.footie.api.mappers;


import gr.manolis.stelios.footie.api.dtos.RobinGroupDTO;
import gr.manolis.stelios.footie.core.EntityMapper;
import gr.manolis.stelios.footie.core.peristence.dtos.groups.RobinGroup;
import org.mapstruct.Mapper;


@Mapper(componentModel = "spring")
public interface RobinGroupMapper extends EntityMapper<RobinGroupDTO, RobinGroup> {
}
