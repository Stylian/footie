package main.java.tools;

import main.java.dtos.Team;
import main.java.dtos.groups.Group;

public class CoefficientsOrdering extends Ordering {
	
	public CoefficientsOrdering(Group group) {
		super(group);
	}

	@Override
	public int compare(Team o1, Team o2) {
		return o2.getStatsForGroup(group).getPoints() - o1.getStatsForGroup(group).getPoints();
	}
}
