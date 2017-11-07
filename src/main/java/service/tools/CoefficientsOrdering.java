package service.tools;

import service.peristence.dtos.Team;
import service.services.ServiceUtils;

public class CoefficientsOrdering extends Ordering {
	
	public CoefficientsOrdering() {
		super(ServiceUtils.getMasterGroup());
	}

	@Override
	public int compare(Team o1, Team o2) {
		return o2.getStatsForGroup(group).getPoints() - o1.getStatsForGroup(group).getPoints();
	}
}
