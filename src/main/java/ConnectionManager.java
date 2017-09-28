package main.java;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class ConnectionManager {

	private static Connection conn;
	
	public static Connection getConnection() {
		
		if(conn == null) {
			try {
				
				Class.forName("org.apache.derby.jdbc.EmbeddedDriver");
				conn = DriverManager.getConnection("jdbc:derby:.\\BD\\nombrebasededatos.db;create=true");
				
			} catch (ClassNotFoundException | SQLException e) {
				e.printStackTrace();
			}
		}
		
		return conn;
	}
	
	
}
