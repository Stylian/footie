package gr.manolis.stelios.footie.core;

import java.util.List;
import java.util.Set;

public class Utils {

	public static String toString(List<?> lsObj) {
		
		String ls = "";
		
		for(Object obj : lsObj) {
			ls += obj.toString() + ", ";
		}
		
		return ls;
	}
	
	public static String toString(Set<?> lsObj) {
		
		String ls = "";
		
		for(Object obj : lsObj) {
			ls += obj.toString() + ", ";
		}
		
		return ls;
	}
	
}
