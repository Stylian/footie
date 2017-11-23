package core.tools;

import core.peristence.dtos.Team;
import core.peristence.dtos.groups.Group;
import core.services.ServiceUtils;

public class CoefficientsOrdering extends Ordering {
	
	public CoefficientsOrdering(Group group) {
		super(group);
	}
	
	public CoefficientsOrdering() {
		super(ServiceUtils.getMasterGroup());
	}

	@Override
	public int compare(Team o1, Team o2) {
		return o2.getStatsForGroup(group).getPoints() - o1.getStatsForGroup(group).getPoints();
	}
}
