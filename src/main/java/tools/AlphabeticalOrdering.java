package main.java.tools;

import main.java.dtos.Group;
import main.java.dtos.Team;

public class AlphabeticalOrdering extends Ordering {

	public AlphabeticalOrdering(Group group) {
		super(group);
	}

	@Override
	public int compare(Team o1, Team o2) {
		return o1.getName().compareTo(o2.getName());
	}

}
