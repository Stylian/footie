package gr.manolis.stelios.footie.core.tools;

import org.apache.commons.lang3.RandomUtils;

import gr.manolis.stelios.footie.core.peristence.dtos.Stats;
import gr.manolis.stelios.footie.core.peristence.dtos.Team;
import gr.manolis.stelios.footie.core.peristence.dtos.groups.Group;

public class RobinGroupOrdering extends Ordering {
	
	public RobinGroupOrdering(Group group) {
		super(group);
	}

	@Override
	public int compare(Team o1, Team o2) {

		Stats s2 = o2.getStatsForGroup(group);
		Stats s1 = o1.getStatsForGroup(group);

		// RULE 1
		if (s1.getPoints() != s2.getPoints()) {
			return s2.getPoints() - s1.getPoints();
		}

		// RULE 2
		if (s1.getGoalDifference() != s2.getGoalDifference()) {
			return s2.getGoalDifference() - s1.getGoalDifference();
		}

		// RULE 3
		if (s1.getGoalsScored() != s2.getGoalsScored()) {
			return s2.getGoalsScored() - s1.getGoalsScored();
		}

		// RULE 4
		if (s1.getWins() != s2.getWins()) {
			return s2.getWins() - s1.getWins();
		}

		// RULE 5 Alphabetical
		return o1.getName().compareTo(o2.getName());
	}
}
