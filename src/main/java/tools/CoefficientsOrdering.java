package main.java.tools;

import main.java.dtos.Group;
import main.java.dtos.Team;

public class CoefficientsOrdering extends Ordering {
	
	public CoefficientsOrdering(Group group) {
		super(group);
	}

	@Override
	public int compare(Team o1, Team o2) {
		return o1.getStatsForGroup(group).getPoints() - o2.getStatsForGroup(group).getPoints();
	}
}
