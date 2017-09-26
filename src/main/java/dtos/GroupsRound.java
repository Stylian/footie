package main.java.dtos;

import java.util.List;

public class GroupsRound extends Round {
	
	private List<Group> groups;

	public List<Group> getGroups() {
		return groups;
	}

	public void setGroups(List<Group> groups) {
		this.groups = groups;
	}
	
}
