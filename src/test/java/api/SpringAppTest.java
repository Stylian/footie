package api;

import static org.assertj.core.api.BDDAssertions.then;
import static org.junit.Assert.assertEquals;

import java.util.Map;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.embedded.LocalServerPort;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = App.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestPropertySource(properties = {"management.port=0"})
public class SpringAppTest {
	
	@LocalServerPort
	private int port;

	@Autowired
	private TestRestTemplate testRestTemplate;
	
	@Test
	@SuppressWarnings("rawtypes")
	public void testAll() throws Exception {
		
		checkURL("/rest/ops/league", "{status=success, message=created league}");
		checkURL("/rest/ops/season/create", "{status=success, message=created Season 1}");
		checkURL("/rest/ops/season/setup", "{status=success, message=set Season 1}");
		checkURL("/rest/ops/quals/1/seed", "{status=success, message=seeded 1st Qualifying Round}");
		checkURL("/rest/ops/quals/1/set", "{status=success, message=set 1st Qualifying Round}");
		
		checkURL("/rest/ops/fillGames", "{status=success, message=games added}");
		
		checkURL("/rest/ops/quals/2/seed", "{status=success, message=seeded 2nd Qualifying Round}");
		checkURL("/rest/ops/quals/2/set", "{status=success, message=set 2nd Qualifying Round}");

		checkURL("/rest/ops/fillGames", "{status=success, message=games added}");

		// TODO
		
	}

	@Test
	@SuppressWarnings("rawtypes")
	public void testView() throws Exception {

		ResponseEntity<String> entity2 = this.testRestTemplate.getForEntity(
				"http://localhost:" + this.port + "/rest/views/league", String.class);
		then(entity2.getStatusCode()).isEqualTo(HttpStatus.OK);
		
		System.out.println(entity2.getBody());

		ResponseEntity<String> entity4 = this.testRestTemplate.getForEntity(
				"http://localhost:" + this.port + "/rest/views/season", String.class);
		then(entity4.getStatusCode()).isEqualTo(HttpStatus.OK);
		

		System.out.println(entity4.getBody());
		
	}

	private void checkURL(String path, String expected) {
		ResponseEntity<Map> entity = this.testRestTemplate.getForEntity(
				"http://localhost:" + this.port + path, Map.class);
		then(entity.getStatusCode()).isEqualTo(HttpStatus.OK);
		
		assertEquals(expected, entity.getBody().toString());
	}
	
}
