package test.java;

import static org.junit.Assert.assertEquals;

import org.junit.Test;

import main.java.Start;

public class SayHi {

	@Test
	public void test() {
		Start start = new Start();
		
		assertEquals("hi", start.sayHi());
		
	}

}
