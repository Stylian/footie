package main.java;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;

import main.java.dtos.Team;

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
		}catch (HibernateException e) {
      if (tx!=null) tx.rollback();
      e.printStackTrace(); 
		}
		
		return id;
		
	}
	
	public T getById(int id, Class<T> clazz) {
		
		return (T) session.get(clazz, id);
		
	}
	
}
