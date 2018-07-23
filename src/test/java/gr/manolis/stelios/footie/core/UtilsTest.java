package gr.manolis.stelios.footie.core;

import static org.junit.Assert.assertEquals;

import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

import org.junit.Test;

public class UtilsTest {

	@Test
	public void testListToString() {

		List<String> list = new ArrayList<>();
		list.add("la");
		list.add("tri");
		list.add("p");
	
		assertEquals("la,tri,p", Utils.toString(list));
		
	}
	
	@Test
	public void testSetToString() {
		
		Set<String> set = new LinkedHashSet<>(); // order needed for the test
		set.add("la");
		set.add("tri");
		set.add("p");
		
		assertEquals("la,tri,p", Utils.toString(set));
		
	}

}
