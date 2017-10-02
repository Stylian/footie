package test.java;

import java.util.Iterator;
import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;
import org.junit.Test;

import main.java.DataAccessObject;
import main.java.HibernateUtils;
import main.java.dtos.Stats;
import main.java.dtos.Team;

public class SayHi {

	@Test
	public void testDaoCreate() throws Exception {

		Session session = HibernateUtils.getSessionFactory().openSession();

		DataAccessObject<Team> dao = new DataAccessObject<>(session);

		Team team = new Team();
		team.setName("test team 1");

		long id = dao.create(team);

		System.out.println(id);

		session.close();

	}

	@Test
	public void testStatsManyToOne() throws Exception {

		Session session = HibernateUtils.getSessionFactory().openSession();

		DataAccessObject<Team> dao = new DataAccessObject<>(session);

		Team team = new Team();
		team.setName("test team 2");

		long id = dao.create(team);

		System.out.println(id);

		DataAccessObject<Stats> dao2 = new DataAccessObject<>(session);

		Stats stats = new Stats();
		stats.setDraws(4);
		stats.setGoalsScored(2);

		stats.setTeam(team);

		long id2 = dao2.create(stats);

		System.out.println(id2);

		session.close();
	}

	@Test
	public void getById() {

		Session session = HibernateUtils.getSessionFactory().openSession();

		DataAccessObject<Team> dao = new DataAccessObject<>(session);
		Team team = (Team) dao.getById(101, Team.class);
		
		System.out.println(team.getName() + "  " + team.getId());

		session.close();

	}

	@Test
	public void test2() {

		Session session = HibernateUtils.getSessionFactory().openSession();

		Transaction tx = null;
		try {
			tx = session.beginTransaction();
			List teams = session.createQuery("FROM TEAMS").list();

			for (Iterator iterator = teams.iterator(); iterator.hasNext();) {
				Team team = (Team) iterator.next();
				System.out.println(team.getName() + "  " + team.getId());
			}

			tx.commit();

		} catch (HibernateException e) {
			if (tx != null)
				tx.rollback();
			e.printStackTrace();
		}

		session.close();

	}

}
