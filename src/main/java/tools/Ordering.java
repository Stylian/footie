package main.java.tools;

import java.util.Comparator;

import main.java.peristence.dtos.Team;
import main.java.peristence.dtos.groups.Group;

public abstract class Ordering implements Comparator<Team> {

	protected Group group;
	
	public Ordering(Group group) {
		this.group = group;
	}
	
}
