package gr.manolis.stelios.footie.core.tools;

import gr.manolis.stelios.footie.core.peristence.dtos.Team;
import gr.manolis.stelios.footie.core.peristence.dtos.groups.Group;
import gr.manolis.stelios.footie.core.services.ServiceUtils;

public class CoefficientsOrdering extends Ordering {
	
	public CoefficientsOrdering(Group group) {
		super(group);
	}

	@Override
	public int compare(Team o1, Team o2) {
		return o2.getStatsForGroup(group).getPoints() - o1.getStatsForGroup(group).getPoints();
	}
}
