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
		
		ResponseEntity<Map> entity1 = this.testRestTemplate.getForEntity(
				"http://localhost:" + this.port + "/rest/ops/league", Map.class);
		then(entity1.getStatusCode()).isEqualTo(HttpStatus.OK);
		
		assertEquals("{status=success, message=created league}", entity1.getBody().toString());
		
		ResponseEntity<Map> entity2 = this.testRestTemplate.getForEntity(
				"http://localhost:" + this.port + "/rest/ops/season/create", Map.class);
		then(entity2.getStatusCode()).isEqualTo(HttpStatus.OK);

		assertEquals("{status=success, message=created league}", entity1.getBody().toString());
		
		ResponseEntity<Map> entity3 = this.testRestTemplate.getForEntity(
				"http://localhost:" + this.port + "/rest/ops/season/setup", Map.class);
		then(entity3.getStatusCode()).isEqualTo(HttpStatus.OK);

		assertEquals("{status=success, message=created league}", entity1.getBody().toString());
		
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
	
}
