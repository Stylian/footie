package gr.manolis.stelios.footie.core;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

import org.apache.log4j.Logger;

/**
 * TODO there is a spring way to load properties, to do that
 * 
 * @author stylianos.chatzimano
 *
 */
public class Rules {

	final static Logger logger = Logger.getLogger(Rules.class);

	private static final String RULES_FILE = "src/main/resources/rules.txt";

	public static final int PROMOTION_POINTS_QUALS_1;
	public static final int PROMOTION_POINTS_QUALS_2;

	public static final int POINTS_GROUP12_1ST_PLACE;
	public static final int POINTS_GROUP12_2ND_PLACE;

	public static final int POINTS_GROUP8_1ST_PLACE;
	public static final int POINTS_GROUP8_2ND_PLACE;
	public static final int POINTS_GROUP8_3RD_PLACE;

	public static final int PROMOTION_TO_FINAL;
	public static final int POINTS_WINNING_THE_LEAGUE;

	public static final int WIN_POINTS;
	public static final int DRAW_POINTS;
	public static final int GOALS_POINTS;

	static {

		Properties rules = Rules.load();
		PROMOTION_POINTS_QUALS_1 = Integer.parseInt(rules.getProperty("promotion_from_1st_quals_round"));
		PROMOTION_POINTS_QUALS_2 = Integer.parseInt(rules.getProperty("promotion_from_2nd_quals_round"));
		POINTS_GROUP12_1ST_PLACE = Integer.parseInt(rules.getProperty("groups12_1st_place"));
		POINTS_GROUP12_2ND_PLACE = Integer.parseInt(rules.getProperty("groups12_2nd_place"));
		POINTS_GROUP8_1ST_PLACE = Integer.parseInt(rules.getProperty("groups8_1st_place"));
		POINTS_GROUP8_2ND_PLACE = Integer.parseInt(rules.getProperty("groups8_2nd_place"));
		POINTS_GROUP8_3RD_PLACE = Integer.parseInt(rules.getProperty("groups8_3rd_place"));
		PROMOTION_TO_FINAL = Integer.parseInt(rules.getProperty("promotion_to_final"));
		POINTS_WINNING_THE_LEAGUE = Integer.parseInt(rules.getProperty("winning_the_league"));
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
