package main.java.tools;

import java.util.Comparator;

import main.java.dtos.Team;
import main.java.dtos.groups.Group;

public abstract class Ordering implements Comparator<Team> {

	protected Group group;
	
	public Ordering(Group group) {
		this.group = group;
	}
	
}
