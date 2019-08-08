package gr.manolis.stelios.footie.api.controllers;


import gr.manolis.stelios.footie.api.dtos.RobinGroupDTO;
import gr.manolis.stelios.footie.api.mappers.RobinGroupMapper;
import gr.manolis.stelios.footie.core.peristence.dtos.groups.RobinGroup;
import gr.manolis.stelios.footie.core.services.ServiceUtils;
import org.apache.commons.lang3.math.NumberUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.transaction.Transactional;

@RestController
@Transactional
@RequestMapping("/rest/groups")
public class RestGroupsController {

    final static Logger logger = Logger.getLogger(RestTeamsController.class);

    @Autowired
    private RobinGroupMapper robinGroupMapper;

    @Autowired
    private ServiceUtils serviceUtils;

    @RequestMapping("/{group_id}")
    public RobinGroupDTO getGroupData(@PathVariable(value = "group_id", required = true) String strGroupId) {
        logger.info("getGroupData");

        int groupId = NumberUtils.toInt(strGroupId);
        RobinGroup group = serviceUtils.loadRobinGroup(groupId);

        return robinGroupMapper.toDTO(group);
    }
}
