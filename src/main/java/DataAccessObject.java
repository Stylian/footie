package main.java;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;

public class DataAccessObject<T> implements AutoCloseable {

	private SessionFactory factory;
	private Session session;
	
	public DataAccessObject() {
	  try{
	    factory = new Configuration().configure().buildSessionFactory();
	    session = factory.openSession();
	  }catch (Throwable ex) { 
	  	System.err.println("Failed to create sessionFactory object." + ex);
	    throw new ExceptionInInitializerError(ex); 
	  }
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

	@Override
	public void close() throws Exception {
		session.close();
	}
	
}
