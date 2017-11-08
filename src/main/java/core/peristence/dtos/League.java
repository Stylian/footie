package core.peristence.dtos;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import core.peristence.DataAccessObject;
import core.peristence.HibernateUtils;

@Entity(name = "LEAGUES")
public class League {

	@Id
	@GeneratedValue
	@Column(name = "ID")
	private int id;

	@Column(name = "SEASON_NUM")
	private int seasonNum;

	@Column(name = "QUALS1")
	private LeagueStage quals1;

	@Column(name = "QUALS2")
	private LeagueStage quals2;

	@Column(name = "GROUPS12")
	private LeagueStage groups12;

	@Column(name = "GROUPS8")
	private LeagueStage groups8;

	@Column(name = "QUARTERFINALS")
	private LeagueStage quarterfinals;

	@Column(name = "SEMIFINALS")
	private LeagueStage semifinals;

	@Column(name = "FINALS")
	private LeagueStage finals;
	
	public League() {
		
		seasonNum = 0;
		resetStages();
	
	}

	public void resetStages() {
		
		quals1 = LeagueStage.NOT_STARTED;
		quals2 = LeagueStage.NOT_STARTED;
		groups12 = LeagueStage.NOT_STARTED;
		groups8 = LeagueStage.NOT_STARTED;
		quarterfinals = LeagueStage.NOT_STARTED;
		semifinals = LeagueStage.NOT_STARTED;
		finals = LeagueStage.NOT_STARTED;
		
	}

	public void save() {
		
		DataAccessObject<League> dao2 = new DataAccessObject<>(HibernateUtils.getSession());
		dao2.save(this);
	
	}
	
	public int getSeasonNum() {
		return seasonNum;
	}

	public void addSeason() {
		this.seasonNum = this.seasonNum + 1;
	}

	public LeagueStage getQuals1() {
		return quals1;
	}

	public void setQuals1(LeagueStage quals1) {
		this.quals1 = quals1;
	}

	public LeagueStage getQuals2() {
		return quals2;
	}

	public void setQuals2(LeagueStage quals2) {
		this.quals2 = quals2;
	}

	public LeagueStage getGroups12() {
		return groups12;
	}

	public void setGroups12(LeagueStage groups12) {
		this.groups12 = groups12;
	}

	public LeagueStage getGroups8() {
		return groups8;
	}

	public void setGroups8(LeagueStage groups8) {
		this.groups8 = groups8;
	}

	public LeagueStage getQuarterfinals() {
		return quarterfinals;
	}

	public void setQuarterfinals(LeagueStage quarterfinals) {
		this.quarterfinals = quarterfinals;
	}

	public LeagueStage getSemifinals() {
		return semifinals;
	}

	public void setSemifinals(LeagueStage semifinals) {
		this.semifinals = semifinals;
	}

	public LeagueStage getFinals() {
		return finals;
	}

	public void setFinals(LeagueStage finals) {
		this.finals = finals;
	}

}
