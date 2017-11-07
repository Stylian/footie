package main.java.service.tools;

import java.util.Comparator;

import main.java.service.peristence.dtos.Team;
import main.java.service.peristence.dtos.groups.Group;

public abstract class Ordering implements Comparator<Team> {

	protected Group group;
	
	public Ordering(Group group) {
		this.group = group;
	}
	
}
