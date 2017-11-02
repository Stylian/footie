package main.java.tools;

import org.apache.commons.lang3.RandomUtils;

import main.java.HibernateUtils;
import main.java.dtos.Stats;
import main.java.dtos.Team;
import main.java.dtos.groups.Group;
import main.java.services.ServiceUtils;

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
		
		// RULE 1.5 *games between teams may not be worth
		
		// RULE 2
		if(s1.getGoalDifference() != s2.getGoalDifference()) {
			return s2.getGoalDifference() - s1.getGoalDifference();
		}
		
		// RULE 3
		if(s1.getGoalsScored() != s2.getGoalsScored()) {
			return s2.getGoalsScored() - s1.getGoalsScored();
		}

		// RULE 4
		if(s1.getWins() != s2.getWins()) {
			return s2.getWins() - s1.getWins();
		}
		
		// RULE 5
		Group master = ServiceUtils.getMasterGroup(HibernateUtils.getSessionFactory().getCurrentSession());
		if(o1.getStatsForGroup(master).getPoints() != o2.getStatsForGroup(master).getPoints()) {
			return o2.getStatsForGroup(master).getPoints() - o1.getStatsForGroup(master).getPoints();
		}
		
		// RULE 6
		return RandomUtils.nextInt(-1, 1);
	}
}