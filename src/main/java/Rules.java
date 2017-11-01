package main.java;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

import org.apache.log4j.Logger;

public class Rules {

	final static Logger logger = Logger.getLogger(Rules.class);
	
	private static final String RULES_FILE = "main/resources/rules.txt";

	public static final int PROMOTION_POINTS_QUALS_1;
	public static final int PROMOTION_POINTS_QUALS_2;
	public static final int WIN_POINTS;
	public static final int DRAW_POINTS;
	public static final int GOALS_POINTS;
	
	static {
		
		Properties rules = Rules.load();
		PROMOTION_POINTS_QUALS_1 = Integer.parseInt(rules.getProperty("promotion_from_1st_quals_round"));
		PROMOTION_POINTS_QUALS_2 = Integer.parseInt(rules.getProperty("promotion_from_2nd_quals_round"));
		WIN_POINTS = Integer.parseInt(rules.getProperty("win"));
		DRAW_POINTS = Integer.parseInt(rules.getProperty("draw"));
		GOALS_POINTS = Integer.parseInt(rules.getProperty("goals_scored"));
	}
	
	public static Properties load() {
		
		try {
			
			Properties props = new Properties();
			File file = new File(RULES_FILE);
			FileInputStream fileInput = new FileInputStream(file);
	
			props.load(fileInput);
		
			return props;
			
		} catch (IOException e) {
			logger.error("rules loading failed");
			e.printStackTrace();
		}
		
		return null;
		
	}
}
