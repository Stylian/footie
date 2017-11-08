package core;

import org.apache.commons.lang3.RandomUtils;
import org.junit.Test;

import core.peristence.HibernateUtils;
import core.peristence.dtos.games.Game;
import core.peristence.dtos.games.Result;
import core.services.BootService;
import core.services.GameService;
import core.services.GroupsRoundService;
import core.services.PlayoffsRoundService;
import core.services.QualsService;
import core.services.SeasonService;

public class FullTest {

	@Test
	public void simulateSeason() throws Exception {

		testBoot();
		
		runSeason();
		
		Monitoring monitoring = new Monitoring();
		monitoring.displaySeason(1);
		monitoring.displayCoefficients();
		monitoring.displayMetastats();

		runSeason();
		
		monitoring.displaySeason(2);
		monitoring.displayCoefficients();
		monitoring.displayMetastats();

		HibernateUtils.closeSession();
		
	}

	private void runSeason() throws Exception {

		testCreateSeason();
		testSetUpSeason();
		
		testSeedQualsRound1();
		testSetQualsRound1();
		fillUpRemainingGames();
		
		testSeedQualsRound2();
		testSetUpQualsRound2();
		fillUpRemainingGames();
		
		testSeedGroupsRound12();
		testSetUpGroupsRound12();
		fillUpRemainingGames();
		
		testSeedAndSetGroupsRound8();
		fillUpRemainingGames();
		
		testSeedAndSetQuarterfinals();
		fillUpRemainingGames();
		
		testSeedAndSetSemifinals();
		fillUpRemainingGames();
		
		testSeedAndSetfinals();
		fillUpRemainingGames();
		
		testEndCurrentSeason();
	}

	public void testBoot() throws Exception {

		BootService service = new BootService();
		service.start();

	}

	public void testCreateSeason() throws Exception {

		SeasonService service = new SeasonService();
		service.createSeason();

	}

	public void testSetUpSeason() throws Exception {

		SeasonService service = new SeasonService();
		service.setUpSeason();

	}

	public void testSeedQualsRound1() throws Exception {

		QualsService service = new QualsService();
		service.seedUpQualsRound1();

	}

	public void testSetQualsRound1() throws Exception {

		QualsService service = new QualsService();
		service.setUpQualsRound1();

	}

	public void fillUpRemainingGames() throws Exception {

		GameService service = new GameService();

		while (true) {

			Game next = service.getNextGame();

			if (next == null) {
				break;
			}

			service.addResult(next, new Result(RandomUtils.nextInt(0, 5), RandomUtils.nextInt(0, 2)));

			System.out.println(next);

		}

	}

	public void testSeedQualsRound2() throws Exception {

		QualsService service = new QualsService();
		service.seedUpQualsRound2();

	}

	public void testSetUpQualsRound2() throws Exception {

		QualsService service = new QualsService();
		service.setUpQualsRound2();

	}

	public void testSeedGroupsRound12() throws Exception {

		GroupsRoundService service = new GroupsRoundService();
		service.seedGroupsRoundOf12();

	}

	public void testSetUpGroupsRound12() throws Exception {

		GroupsRoundService service = new GroupsRoundService();
		service.setUpGroupsRoundOf12();

	}

	public void testSeedAndSetGroupsRound8() throws Exception {

		GroupsRoundService service = new GroupsRoundService();
		service.seedAndSetGroupsRoundOf8();

	}
	
	public void testSeedAndSetQuarterfinals() throws Exception {
		
		PlayoffsRoundService service = new PlayoffsRoundService();
		service.seedAndSetQuarterfinals();
		
	}
	
	public void testSeedAndSetSemifinals() throws Exception {
		
		PlayoffsRoundService service = new PlayoffsRoundService();
		service.seedAndSetSemifinals();
		
	
	}

	public void testSeedAndSetfinals() throws Exception {
		
		PlayoffsRoundService service = new PlayoffsRoundService();
		service.seedAndSetfinals();
		
	}
	
	public void testEndCurrentSeason() throws Exception {

		SeasonService service = new SeasonService();
		service.endCurrentSeason();

	}
	
}
