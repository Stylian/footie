package main.java;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

public class SessionHolder {

	private static final SessionHolder INSTANCE = new SessionHolder();
	
	private SessionFactory factory;
	private Session session;
	
	public synchronized static Session getInstance() {
		
		if (!INSTANCE.session.isOpen()) {
			INSTANCE.session = INSTANCE.factory.openSession();
		}
		
		return INSTANCE.session;
	}
	
	private SessionHolder() {
	  try{
	    factory = new Configuration().configure().buildSessionFactory();
	    session = factory.getCurrentSession();
	  }catch (Throwable ex) { 
	  	System.err.println("Failed to create sessionFactory object." + ex);
	    throw new ExceptionInInitializerError(ex); 
	  }
	}

}
