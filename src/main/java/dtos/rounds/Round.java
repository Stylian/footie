package main.java.dtos.rounds;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import main.java.dtos.Season;

public class Round {

	@Id
	@GeneratedValue
	@Column(name = "ID")
	private int id;

	@Column(name = "NAME")
	private String name;
	
	@ManyToOne(cascade = CascadeType.ALL)
	private Season season;
	
}
