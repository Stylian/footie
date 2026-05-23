package gr.manolis.stelios.footie.core.services;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import jakarta.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import gr.manolis.stelios.footie.core.peristence.dtos.Stats;
import gr.manolis.stelios.footie.core.peristence.dtos.Team;
import gr.manolis.stelios.footie.core.peristence.dtos.groups.Group;
import gr.manolis.stelios.footie.core.tools.Ordering;

@Service
@Transactional
public class GroupService {

	private final static Logger logger = LoggerFactory.getLogger(GroupService.class);

	@Autowired
	private SessionFactory sessionFactory;

	public List<Team> getTeams(Group group) {
		return getTeams(group, null);
	}

	public List<Team> getTeams(Group group, Ordering orderingStrategy) {

		Map<Team, Stats> teamsWithStats = group.getTeamsStats();

		List<Team> teams = new ArrayList<>();

		for (Team team : teamsWithStats.keySet()) {
			teams.add(team);
		}

		if (orderingStrategy != null) {
			Collections.sort(teams, orderingStrategy);
		}

		return teams;

	}

}
