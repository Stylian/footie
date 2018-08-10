package gr.manolis.stelios.footie.core.peristence.dtos.rounds;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.DiscriminatorColumn;
import javax.persistence.DiscriminatorType;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import gr.manolis.stelios.footie.core.peristence.dtos.Stage;
import gr.manolis.stelios.footie.core.peristence.dtos.Team;
import gr.manolis.stelios.footie.core.peristence.dtos.games.Game;
import gr.manolis.stelios.footie.core.peristence.dtos.groups.Season;

@Entity(name = "ROUNDS")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "discriminator", discriminatorType = DiscriminatorType.STRING)
public abstract class Round {

	@Id
	@GeneratedValue
	@Column(name = "ID")
	private int id;

	@Column(name = "NAME")
	private String name;

	@ManyToOne(cascade = CascadeType.ALL)
	private Season season;

	@ManyToMany(fetch = FetchType.LAZY)
	private List<Team> teams;
	
	@Enumerated(EnumType.STRING)
	private Stage stage;
	
	@Column(name = "NUM_OF_ROUND")
	private int num;

	public Round() {
	}

	public Round(Season season, String name, int numOfRound) {
		this.season = season;
		this.name = name;
		this.stage = Stage.NOT_STARTED;
		this.num = numOfRound;
		season.addRound(this);
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	@JsonIgnore
	public Season getSeason() {
		return season;
	}

	public void setSeason(Season season) {
		this.season = season;
	}

	@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
	public List<Team> getTeams() {
		return teams;
	}

	public void setTeams(List<Team> teams) {
		this.teams = teams;
	}
	
	public Stage getStage() {
		return stage;
	}

	public void setStage(Stage stage) {
		this.stage = stage;
	}
	
	public abstract List<Game> getGames();
	
	public Map<Integer, List<Game>> getGamesPerDay() {
		return getGames().stream().collect(Collectors.groupingBy(Game::getDay));
	}

	public int getNum() {
		return num;
	}
	
}
