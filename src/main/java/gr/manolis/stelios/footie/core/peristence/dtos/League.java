package gr.manolis.stelios.footie.core.peristence.dtos;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity(name = "LEAGUES")
public class League {

	@Id
	@GeneratedValue
	@Column(name = "ID")
	private int id;

	@Column(name = "SEASON_NUM")
	private int seasonNum;
	
	public League() {
		seasonNum = 0;
	}

	public int getSeasonNum() {
		return seasonNum;
	}

	public void addSeason() {
		this.seasonNum = this.seasonNum + 1;
	}


}
