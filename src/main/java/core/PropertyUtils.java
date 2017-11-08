package core;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Properties;

import org.apache.log4j.Logger;

public abstract class PropertyUtils {

	final static Logger logger = Logger.getLogger(PropertyUtils.class);
	
	private static final String PROPERTIES_FILE = "src/main/resources/properties.txt";
	
	public static void save(Properties prop) {

		try {

			File file = new File(PROPERTIES_FILE);
			FileOutputStream fileOutput = new FileOutputStream(file);
			prop.store(fileOutput, "Properties File");
		
		} catch (IOException e) {
			logger.error("properties saving failed");
			e.printStackTrace();
		}
		
	}

	public static Properties load() {
		
		try {
			
			Properties props = new Properties();
			File file = new File(PROPERTIES_FILE);
			FileInputStream fileInput = new FileInputStream(file);
	
			props.load(fileInput);
		
			return props;
			
		} catch (IOException e) {
			logger.error("properties loading failed");
			e.printStackTrace();
		}
		
		return null;
		
	}
	
}
