package main.java.dtos.rounds;

import java.util.List;

import main.java.dtos.PlayoffEntry;
import main.java.dtos.Season;

public class PlayoffsRound extends Round {
	
	public PlayoffsRound(Season season, String name) {
		super(season, name);
		// TODO Auto-generated constructor stub
	}

	private List<PlayoffEntry> entries;

	public List<PlayoffEntry> getEntries() {
		return entries;
	}

	public void setEntries(List<PlayoffEntry> entries) {
		this.entries = entries;
	}
}
