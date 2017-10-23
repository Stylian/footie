package main.java.dtos;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity(name = "MATCHUPS")
public class Matchup {

	@Id
	@GeneratedValue
	@Column(name = "ID")
	private int id;

	// one to many right? to fix
	@ManyToOne(cascade = CascadeType.ALL)
	private List<Game> games;

	// to add equality rules, replayability by adding games etc.
}
