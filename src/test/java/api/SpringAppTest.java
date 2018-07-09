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
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import core.Monitoring;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = App.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestPropertySource(properties = {"management.port=0"})
public class SpringAppTest {
	
	@LocalServerPort
	private int port;

	@Autowired
	private TestRestTemplate testRestTemplate;
	
	@Test
	public void testOps() throws Exception {
		
//		checkURL("/rest/ops/league", "{status=success, message=created league}");
//
//		for(int n=1; n < 5; n++)
//			runSeason(n);
//		
//		displayResults();
		
	}

	private void runSeason(int seasonNum) {
		checkURL("/rest/ops/season/create", "{status=success, message=created Season " + seasonNum + "}");
		checkURL("/rest/ops/season/setup", "{status=success, message=set Season " + seasonNum + "}");
		checkURL("/rest/ops/quals/1/seed", "{status=success, message=seeded 1st Qualifying Round}");
		checkURL("/rest/ops/quals/1/set", "{status=success, message=set 1st Qualifying Round}");
		checkURL("/rest/test/fillGames", "{status=success, message=games added}");
		
		checkURL("/rest/ops/quals/2/seed", "{status=success, message=seeded 2nd Qualifying Round}");
		checkURL("/rest/ops/quals/2/set", "{status=success, message=set 2nd Qualifying Round}");
		checkURL("/rest/test/fillGames", "{status=success, message=games added}");

		checkURL("/rest/ops/groups/12/seed", "{status=success, message=seeded Groups Round of 12}");
		checkURL("/rest/ops/groups/12/set", "{status=success, message=set Groups Round of 12}");
		checkURL("/rest/test/fillGames", "{status=success, message=games added}");

		checkURL("/rest/ops/groups/8/seedAndSet", "{status=success, message=seeded and set Groups Round of 8}");
		checkURL("/rest/test/fillGames", "{status=success, message=games added}");

		checkURL("/rest/ops/playoffs/quarterfinals/seedAndSet", "{status=success, message=seeded and set Playoffs}");
		checkURL("/rest/test/fillGames", "{status=success, message=games added}");
		
		checkURL("/rest/ops/playoffs/semifinals/seedAndSet", "{status=success, message=seeded and set Playoffs}");
		checkURL("/rest/test/fillGames", "{status=success, message=games added}");
		
		checkURL("/rest/ops/playoffs/finals/seedAndSet", "{status=success, message=seeded and set Playoffs}");
		checkURL("/rest/test/fillGames", "{status=success, message=games added}");
		
		checkURL("/rest/ops/season/end", "{status=success, message=ended Season " + seasonNum + "}");
	}

	public void displayResults() throws Exception {

		Monitoring monitoring = new Monitoring();
		monitoring.displayCoefficients();
//		monitoring.displaySeason(1);
		monitoring.displayMetastats();
		
//		ResponseEntity<String> entity2 = this.testRestTemplate.getForEntity(
//				"http://localhost:" + this.port + "/rest/views/league", String.class);
//		then(entity2.getStatusCode()).isEqualTo(HttpStatus.OK);
//		
//		System.out.println(entity2.getBody());
//
//		ResponseEntity<String> entity4 = this.testRestTemplate.getForEntity(
//				"http://localhost:" + this.port + "/rest/views/season", String.class);
//		then(entity4.getStatusCode()).isEqualTo(HttpStatus.OK);
//		
//
//		System.out.println(entity4.getBody());
		
	}

	private void checkURL(String path, String expected) {
		
		MultiValueMap<String, Object> parts = new LinkedMultiValueMap<String, Object>();
		
		ResponseEntity<Map> entity = this.testRestTemplate.postForEntity(
				"http://localhost:" + this.port + path, parts, Map.class);
		then(entity.getStatusCode()).isEqualTo(HttpStatus.OK);
		
		assertEquals(expected, entity.getBody().toString());
	}
	
}
