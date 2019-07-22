package gr.manolis.stelios.footie.api.mappers;


import gr.manolis.stelios.footie.api.dtos.RobinGroupDTO;
import gr.manolis.stelios.footie.api.dtos.TeamGroupDTO;
import gr.manolis.stelios.footie.core.EntityMapper;
import gr.manolis.stelios.footie.core.peristence.dtos.Stats;
import gr.manolis.stelios.footie.core.peristence.dtos.Team;
import gr.manolis.stelios.footie.core.peristence.dtos.games.Game;
import gr.manolis.stelios.footie.core.peristence.dtos.groups.RobinGroup;
import org.junit.After;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;


@Mapper(componentModel = "spring")
public abstract class RobinGroupMapper implements EntityMapper<RobinGroupDTO, RobinGroup> {

    @Autowired
    TeamGroupMapper teamGroupMapper;

    @AfterMapping
    void afterMapping(@MappingTarget RobinGroupDTO robinGroupDTO, RobinGroup robinGroup) {

        List<TeamGroupDTO> teamsInGroup = new ArrayList<>();

        for (Map.Entry<Team, Stats> teamsStats : robinGroup.getTeamsStats().entrySet()) {
            TeamGroupDTO teamGroupDTO = teamGroupMapper.toDTO(teamsStats.getKey());
            teamGroupDTO.setStats(teamsStats.getValue());

            teamsInGroup.add(teamGroupDTO);
        }

        List<Team> teamsOrdered = robinGroup.getTeams();
        List<TeamGroupDTO> teamsInGroupOrdered = new ArrayList<>();
        for (Team team : teamsOrdered) {
            for (TeamGroupDTO tDTO : teamsInGroup) {
                if (team.getName().equals(tDTO.getName())) {
                    teamsInGroupOrdered.add(tDTO);
                    break;
                }
            }
        }

        robinGroupDTO.setTeams(teamsInGroupOrdered);
        robinGroupDTO.setRound(teamsInGroupOrdered.size() > 3 ? 2 : 1);
    }

}
