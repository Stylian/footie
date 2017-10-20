package main.java;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Properties;

public abstract class PropertyUtils {

	private static final String PROPERTIES_FILE = "main/resources/properties.txt";
	
	public static void save(Properties prop) throws IOException {


		File file = new File(PROPERTIES_FILE);
		FileOutputStream fileOutput = new FileOutputStream(file);
		prop.store(fileOutput, "Properties File");
		
	}

	public static Properties load() throws IOException {
		
		Properties props = new Properties();
		File file = new File(PROPERTIES_FILE);
		FileInputStream fileInput = new FileInputStream(file);

		props.load(fileInput);
		
		return props;
	}
	
}
