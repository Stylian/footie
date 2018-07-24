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

import gr.manolis.stelios.footie.core.peristence.dtos.Stats;
import gr.manolis.stelios.footie.core.peristence.dtos.Team;
import gr.manolis.stelios.footie.core.peristence.dtos.groups.Group;

@RunWith(MockitoJUnitRunner.class)
public class RobinGroupOrderingTest {

	@Mock
	Team t1;

	@Mock
	Team t2;

	@Mock
	Team t3;
	
	@Mock
	Team t4;
	
	@Mock
	Team t5;
	
	@Mock
	Team t6;

	@Mock
	Group group;
	
	@Mock
	Group master;

	@Mock
	Stats statsT1;
	
	@Mock
	Stats statsT2;
	
	@Mock
	Stats statsT3;
	
	@Mock
	Stats statsT4;
	
	@Mock
	Stats statsT5;
	
	@Mock
	Stats statsT6;
	
	@Mock
	Stats statsT5Master;
	
	@Mock
	Stats statsT6Master;

	@Test
	public void testCompare() {

		when(t1.getName()).thenReturn("t1");
		when(t2.getName()).thenReturn("t2");
		when(t3.getName()).thenReturn("t3");
		when(t4.getName()).thenReturn("t4");
		when(t5.getName()).thenReturn("t5");
		when(t6.getName()).thenReturn("t6");
		
		when(t1.getStatsForGroup(group)).thenReturn(statsT1);
		when(t2.getStatsForGroup(group)).thenReturn(statsT2);
		when(t3.getStatsForGroup(group)).thenReturn(statsT3);
		when(t4.getStatsForGroup(group)).thenReturn(statsT4);
		when(t5.getStatsForGroup(group)).thenReturn(statsT5);
		when(t6.getStatsForGroup(group)).thenReturn(statsT6);

		when(t5.getStatsForGroup(master)).thenReturn(statsT5Master);
		when(t6.getStatsForGroup(master)).thenReturn(statsT6Master);
		
		// RULE 1
		when(statsT1.getPoints()).thenReturn(5);
		when(statsT2.getPoints()).thenReturn(7);
		when(statsT3.getPoints()).thenReturn(7);
		when(statsT4.getPoints()).thenReturn(7);
		when(statsT5.getPoints()).thenReturn(7);
		when(statsT6.getPoints()).thenReturn(7);
		
		// RULE 2
		when(statsT2.getGoalDifference()).thenReturn(2);
		when(statsT3.getGoalDifference()).thenReturn(7);
		when(statsT4.getGoalDifference()).thenReturn(7);
		when(statsT5.getGoalDifference()).thenReturn(7);
		when(statsT6.getGoalDifference()).thenReturn(7);
		
		// RULE 3
		when(statsT3.getGoalsScored()).thenReturn(7);
		when(statsT4.getGoalsScored()).thenReturn(5);
		when(statsT5.getGoalsScored()).thenReturn(7);
		when(statsT6.getGoalsScored()).thenReturn(7);
		
		// RULE 4
		when(statsT3.getWins()).thenReturn(1);
		when(statsT5.getWins()).thenReturn(7);
		when(statsT6.getWins()).thenReturn(7);
		
		// RULE 5
		when(statsT5Master.getPoints()).thenReturn(7);
		when(statsT6Master.getPoints()).thenReturn(9);

		List<Team> list = new ArrayList<>();
		list.add(t1);
		list.add(t2);
		list.add(t3);
		list.add(t4);
		list.add(t5);
		list.add(t6);

		Collections.sort(list, new RobinGroupOrdering(group, master));

		assertEquals("t6", list.get(0).getName());
		assertEquals("t5", list.get(1).getName());
		assertEquals("t3", list.get(2).getName());
		assertEquals("t4", list.get(3).getName());
		assertEquals("t2", list.get(4).getName());
		assertEquals("t1", list.get(5).getName());

	}
}
