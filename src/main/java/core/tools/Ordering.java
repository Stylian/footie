package core.tools;

import java.util.Comparator;

import core.peristence.dtos.Team;
import core.peristence.dtos.groups.Group;

public abstract class Ordering implements Comparator<Team> {

	protected Group group;
	
	public Ordering(Group group) {
		this.group = group;
	}
	
}
