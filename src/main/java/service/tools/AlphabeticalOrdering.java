package main.java.service.tools;

import main.java.service.peristence.dtos.Team;
import main.java.service.peristence.dtos.groups.Group;

public class AlphabeticalOrdering extends Ordering {

	public AlphabeticalOrdering(Group group) {
		super(group);
	}

	@Override
	public int compare(Team o1, Team o2) {
		return o1.getName().compareTo(o2.getName());
	}

}
