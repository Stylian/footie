package main.java.dtos;

import java.util.List;

public class PlayoffsRound extends Round {
	
	private List<PlayoffEntry> entries;

	public List<PlayoffEntry> getEntries() {
		return entries;
	}

	public void setEntries(List<PlayoffEntry> entries) {
		this.entries = entries;
	}
}
