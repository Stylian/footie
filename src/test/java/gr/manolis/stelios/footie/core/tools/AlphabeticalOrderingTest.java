package gr.manolis.stelios.footie.core.tools;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

import gr.manolis.stelios.footie.core.peristence.dtos.Team;
import gr.manolis.stelios.footie.core.peristence.dtos.groups.Group;

@RunWith(MockitoJUnitRunner.class)
public class AlphabeticalOrderingTest {

	@Mock
	Team Zagreb;

	@Mock
	Team Alexa;
	
	@Mock
	Group group;
	
	@Test
	public void testCompare() {

		when(Zagreb.getName()).thenReturn("Zagreb");
		when(Alexa.getName()).thenReturn("Alexa");
		
		List<Team> list = new ArrayList<>();
		list.add(Zagreb);
		list.add(Alexa);
		
		Collections.sort(list, new AlphabeticalOrdering(group));
		
		assertEquals("Alexa", list.get(0).getName());
		assertEquals("Zagreb", list.get(1).getName());
		
	}
	
}