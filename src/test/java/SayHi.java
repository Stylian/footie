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
import main.java.dtos.Team;

public class SayHi {

	@Test
	public void testDaoCreate() throws Exception {
		
		try(DataAccessObject<Team> dao = new DataAccessObject<>()) {
		
			Team team = new Team();
			team.setName("test team 1");
			
			long id = dao.create(team);
			
			System.out.println(id);
		
		}
		
	}

	@Test
	public void test2() {
		
		SessionFactory factory;
		
	  try{
	    factory = new Configuration().configure().buildSessionFactory();
	  }catch (Throwable ex) { 
	  	System.err.println("Failed to create sessionFactory object." + ex);
	    throw new ExceptionInInitializerError(ex); 
	  }
    
		Session session = factory.openSession();
    Transaction tx = null;
    try{
       tx = session.beginTransaction();
       List teams = session.createQuery("FROM TEAMS").list(); // FAILS!
       
       for (Iterator iterator = teams.iterator(); iterator.hasNext();) {
         Team team = (Team) iterator.next();
         System.out.println(team.getName() + "  " + team.getId() );
     }
       
       tx.commit();

    }catch (HibernateException e) {
       if (tx!=null) tx.rollback();
       e.printStackTrace(); 
    }finally {
       session.close(); 
    }
		
	}

}
