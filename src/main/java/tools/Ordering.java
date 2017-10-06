package main.java.tools;

import java.util.Comparator;

import main.java.dtos.Group;
import main.java.dtos.Team;

public abstract class Ordering implements Comparator<Team> {

	protected Group group;
	
	public Ordering(Group group) {
		this.group = group;
	}
	
}
