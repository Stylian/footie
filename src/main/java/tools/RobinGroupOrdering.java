package main.java.tools;

import main.java.dtos.Stats;
import main.java.dtos.Team;
import main.java.dtos.groups.Group;

public class RobinGroupOrdering extends Ordering {
	
	public RobinGroupOrdering(Group group) {
		super(group);
	}

	@Override
	public int compare(Team o1, Team o2) {
		
		Stats s2 = o2.getStatsForGroup(group);
		Stats s1 = o1.getStatsForGroup(group);
		
		// RULE 1
		if(s1.getPoints() != s2.getPoints()) {
			return s2.getPoints() - s1.getPoints();
		}
		
		// games between teams may not be worth
		
		// RULE 2
		if(s1.getGoalDifference() != s2.getGoalDifference()) {
			return s2.getGoalDifference() - s1.getGoalDifference();
		}
		
		// RULE 3
		
		
		return o2.getStatsForGroup(group).getPoints() - o1.getStatsForGroup(group).getPoints();
	}
}
