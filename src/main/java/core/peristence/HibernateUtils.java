package core.peristence;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;

public class HibernateUtils {

	private static SessionFactory sessionFactory;
	private static Session session;
	
	public static void setSessionFactory(SessionFactory sf) {
		sessionFactory = sf;
	}

	public static SessionFactory getSessionFactory() {
		return sessionFactory;
	}

	public static void closeFactory() {
		if (sessionFactory != null) {
			try {
				sessionFactory.close();
			} catch (HibernateException ex) {
				System.err.println("Couldn't close SessionFactory" + ex);
			}
		}
	}
	
	public static Session getSession() {
		
		if(session == null || !session.isOpen()) {
			session = sessionFactory.openSession();
		}
		
		return session;
	}
	
	public static void closeSession() {
		session.close();
	}
	
}
