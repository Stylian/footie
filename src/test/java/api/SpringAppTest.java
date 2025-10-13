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
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import gr.manolis.stelios.footie.api.App;

@RunWith(SpringRunner.class)
@SpringBootTest(classes =
		{
				App.class,
				DerbyTestDbConfig.class
		},
		webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestPropertySource(properties = { "management.port=0" })
@ActiveProfiles("test")
public class SpringAppTest {

	@LocalServerPort
	private int port;

	@Autowired
	private TestRestTemplate testRestTemplate;

	@Test
	public void testOps() throws Exception {

//		for (int n = 1; n < 3; n++)
//			runSeason(n);

	}

	private void runSeason(int seasonNum) {
		checkURL("/rest/ops/season/create", "{status=success, message=created Season " + seasonNum + "}");

		if(seasonNum > 1) {
			checkURL("/rest/ops/quals/0/set", "{status=success, message=set quals0}");
			checkURLGet("/rest/ops/fill", "{status=success, message=games added}");
			runURLget("/rest/next_game");
		}

		checkURL("/rest/ops/quals/1/set", "{status=success, message=set quals1}");
		checkURLGet("/rest/ops/fill", "{status=success, message=games added}");
		runURLget("/rest/next_game");

		checkURL("/rest/ops/quals/2/set", "{status=success, message=set quals2}");
		checkURLGet("/rest/ops/fill", "{status=success, message=games added}");
		runURLget("/rest/next_game");

		checkURL("/rest/ops/groups/1/set", "{status=success, message=set groups1}");
		checkURLGet("/rest/ops/fill", "{status=success, message=games added}");
		runURLget("/rest/next_game");

		checkURLGet("/rest/ops/fill", "{status=success, message=games added}");
		runURLget("/rest/next_game");

		checkURLGet("/rest/ops/fill", "{status=success, message=games added}");
		runURLget("/rest/next_game");

		checkURLGet("/rest/ops/fill", "{status=success, message=games added}");
		runURLget("/rest/next_game");

		checkURLGet("/rest/ops/fill", "{status=success, message=games added}");
		runURLget("/rest/next_game");

	}

	private void checkURL(String path, String expected) {

		MultiValueMap<String, Object> parts = new LinkedMultiValueMap<String, Object>();

		ResponseEntity<Map> entity = this.testRestTemplate.postForEntity("http://localhost:" + this.port + path, parts,
				Map.class);
		then(entity.getStatusCode()).isEqualTo(HttpStatus.OK);

		assertEquals(expected, entity.getBody().toString());
	}

	private void checkURLGet(String path, String expected) {

		MultiValueMap<String, Object> parts = new LinkedMultiValueMap<String, Object>();

		ResponseEntity<Map> entity = this.testRestTemplate.getForEntity("http://localhost:" + this.port + path,
				Map.class);
		then(entity.getStatusCode()).isEqualTo(HttpStatus.OK);

		assertEquals(expected, entity.getBody().toString());
	}
	private void runURLget(String path) {

		MultiValueMap<String, Object> parts = new LinkedMultiValueMap<String, Object>();

		ResponseEntity<Map> entity = this.testRestTemplate.getForEntity("http://localhost:" + this.port + path,
				Map.class);
		then(entity.getStatusCode()).isEqualTo(HttpStatus.OK);
	}

}
