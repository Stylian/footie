package service.tools;

import java.util.Comparator;

import service.peristence.dtos.Team;
import service.peristence.dtos.groups.Group;

public abstract class Ordering implements Comparator<Team> {

	protected Group group;
	
	public Ordering(Group group) {
		this.group = group;
	}
	
}
