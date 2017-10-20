package main.java.dtos.rounds;

import java.util.List;

import main.java.dtos.PlayoffEntry;

public class PlayoffsRound extends Round {
	
	private List<PlayoffEntry> entries;

	public List<PlayoffEntry> getEntries() {
		return entries;
	}

	public void setEntries(List<PlayoffEntry> entries) {
		this.entries = entries;
	}
}
