package main.java.services;

import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.Session;

import main.java.DataAccessObject;
import main.java.dtos.Team;

public class TeamsService {

	final static Logger logger = Logger.getLogger(TeamsService.class);

	private Session session;

	public TeamsService(Session session) {
		this.session = session;
	}

	public List<Team> listAll() {
		DataAccessObject<Team> dao = new DataAccessObject<>(session);
		return dao.list("TEAMS");
	}

}
