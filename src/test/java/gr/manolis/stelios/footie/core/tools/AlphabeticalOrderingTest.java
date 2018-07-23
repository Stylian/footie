package gr.manolis.stelios.footie.core.tools;

import static org.junit.Assert.assertEquals;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.junit.Test;

import gr.manolis.stelios.footie.core.peristence.dtos.Team;
import gr.manolis.stelios.footie.core.peristence.dtos.groups.Group;

public class AlphabeticalOrderingTest {

	@Test
	public void testCompare() {

		List<Team> list = new ArrayList<>();
		list.add(new Team("Zagreb"));
		list.add(new Team("Alexa"));
		
		Collections.sort(list, new AlphabeticalOrdering(new Group()));
		
		assertEquals("Alexa", list.get(0).getName());
		assertEquals("Zagreb", list.get(1).getName());
		
	}
	
}
