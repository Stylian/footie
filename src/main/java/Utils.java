package main.java;

import java.util.List;

public class Utils {

	public static String toString(List<?> lsObj) {
		
		String ls = "";
		
		for(Object obj : lsObj) {
			ls += obj.toString() + ", ";
		}
		
		return ls;
	}
	
}
