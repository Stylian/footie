package main.java.dtos.rounds;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinTable;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import main.java.dtos.Matchup;
import main.java.dtos.Team;
import main.java.dtos.enums.MatchupFormat;
import main.java.dtos.enums.MatchupTieStrategy;
import main.java.dtos.groups.Season;

@Entity
@DiscriminatorValue(value = "PR")
public class PlayoffsRound extends Round {

	@ManyToOne(fetch = FetchType.LAZY)
	private Team gA1;

	@ManyToOne(fetch = FetchType.LAZY)
	private Team gA2;

	@ManyToOne(fetch = FetchType.LAZY)
	private Team gA3;

	@ManyToOne(fetch = FetchType.LAZY)
	private Team gB1;

	@ManyToOne(fetch = FetchType.LAZY)
	private Team gB2;

	@ManyToOne(fetch = FetchType.LAZY)
	private Team gB3;

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinTable(name="QUARTER_MATCHUPS_ROUNDS")
	private List<Matchup> quarterMatchups = new ArrayList<>();

	public PlayoffsRound() {
	}

	public PlayoffsRound(Season season, String name) {
		super(season, name);
	}

	public void buildQuarterMatchups() {
		
		quarterMatchups.add(new Matchup(
				gA2,
				gB3,
				MatchupFormat.FORMAT_IN_OUT_SINGLE,
				MatchupTieStrategy.REPLAY_GAMES
			));
		
		quarterMatchups.add(new Matchup(
				gB2,
				gA3,
				MatchupFormat.FORMAT_IN_OUT_SINGLE,
				MatchupTieStrategy.REPLAY_GAMES
				));
		
	}
	
	public Team getgA1() {
		return gA1;
	}

	public void setgA1(Team gA1) {
		this.gA1 = gA1;
	}

	public Team getgA2() {
		return gA2;
	}

	public void setgA2(Team gA2) {
		this.gA2 = gA2;
	}

	public Team getgA3() {
		return gA3;
	}

	public void setgA3(Team gA3) {
		this.gA3 = gA3;
	}

	public Team getgB1() {
		return gB1;
	}

	public void setgB1(Team gB1) {
		this.gB1 = gB1;
	}

	public Team getgB2() {
		return gB2;
	}

	public void setgB2(Team gB2) {
		this.gB2 = gB2;
	}

	public Team getgB3() {
		return gB3;
	}

	public void setgB3(Team gB3) {
		this.gB3 = gB3;
	}

	public List<Matchup> getQuarterMatchups() {
		return quarterMatchups;
	}

}
