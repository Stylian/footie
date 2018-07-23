package gr.manolis.stelios.footie.core.peristence;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;

import gr.manolis.stelios.footie.core.peristence.dtos.Team;

public class DataAccessObject<T> {

	private Session session;

	public DataAccessObject(Session session) {
		this.session = session;
	}

	public int save(T t) {

		Integer id = null;

		Transaction tx = null;

		try {
			tx = session.beginTransaction();

			id = (Integer) session.save(t);
			tx.commit();
		} catch (HibernateException e) {
			if (tx != null) {
				tx.rollback();
			}
			e.printStackTrace();
		}

		return id;

	}

	public T getById(int id, Class<T> clazz) {

		return (T) session.get(clazz, id);

	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	public List<T> listByField(String tableName, String columnName, String value) {

		List<T> list = new ArrayList<>();

		List results = session.createQuery("from " + tableName + " where " + columnName + "=:param")
				.setParameter("param", value).list();

		for (Iterator iterator = results.iterator(); iterator.hasNext();) {

			list.add((T) iterator.next());

		}

		return list;

	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	public List<T> list(String table) {

		List<T> list = new ArrayList<>();

		List results = session.createQuery("FROM " + table).list();

		for (Iterator iterator = results.iterator(); iterator.hasNext();) {

			list.add((T) iterator.next());

		}

		return list;

	}

	public void delete(T t) {

		Transaction tx = null;

		try {
			tx = session.beginTransaction();

			session.delete(t);

			tx.commit();
		} catch (HibernateException e) {
			if (tx != null) {
				tx.rollback();
			}
			e.printStackTrace();
		}

	}

}
