package gr.manolis.stelios.footie.core;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public class Utils {

	public static String toString(List<?> lsObj) {
		return lsObj.stream().map(Object::toString).collect(Collectors.joining(","));
	}

	public static String toString(Set<?> lsObj) {
		return lsObj.stream().map(Object::toString).collect(Collectors.joining(","));
	}

}
