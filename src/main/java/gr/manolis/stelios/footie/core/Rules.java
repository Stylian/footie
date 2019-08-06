package gr.manolis.stelios.footie.core;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

import org.apache.log4j.Logger;

/**
 *
 * @author stylianos.chatzimano
 *
 */
public class Rules {

	final static Logger logger = Logger.getLogger(Rules.class);

	public static final int PROMOTION_POINTS_QUALS_1 = 500;
	public static final int PROMOTION_POINTS_QUALS_2 = 700;

	public static final int POINTS_GROUP12_1ST_PLACE = 600;
	public static final int POINTS_GROUP12_2ND_PLACE = 300;

	public static final int POINTS_GROUP8_1ST_PLACE = 2000;
	public static final int POINTS_GROUP8_2ND_PLACE = 600;
	public static final int POINTS_GROUP8_3RD_PLACE = 300;

	public static final int PROMOTION_TO_FINAL = 1000;
	public static final int POINTS_WINNING_THE_LEAGUE = 2000;

	public static final int WIN_POINTS = 1000;
	public static final int DRAW_POINTS = 500;
	public static final int GOALS_POINTS = 100;

}
