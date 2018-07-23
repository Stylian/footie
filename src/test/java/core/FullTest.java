package core;

import org.apache.commons.lang3.RandomUtils;

import gr.manolis.stelios.footie.core.peristence.dtos.games.Game;
import gr.manolis.stelios.footie.core.peristence.dtos.games.Result;
import gr.manolis.stelios.footie.core.services.BootService;
import gr.manolis.stelios.footie.core.services.GameService;
import gr.manolis.stelios.footie.core.services.GroupsRoundService;
import gr.manolis.stelios.footie.core.services.PlayoffsRoundService;
import gr.manolis.stelios.footie.core.services.QualsService;
import gr.manolis.stelios.footie.core.services.SeasonService;

public class FullTest {

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
		service.loadLeague();

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
