package gr.manolis.stelios.footie.core.tools;

import java.util.Comparator;

import gr.manolis.stelios.footie.core.peristence.dtos.Team;
import gr.manolis.stelios.footie.core.peristence.dtos.groups.Group;

public abstract class Ordering implements Comparator<Team> {

	protected Group group;

	public Ordering(Group group) {
		this.group = group;
	}

}
