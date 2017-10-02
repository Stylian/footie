package main.java;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;

public class DataAccessObject<T> {

	private Session session;
	
	public DataAccessObject(Session session) {
		this.session = session;
	}
	
	public int create(T t) {

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
	
}
