package gr.manolis.stelios.footie.api.services;

import gr.manolis.stelios.footie.api.RestResponse;
import gr.manolis.stelios.footie.core.peristence.dtos.games.Game;
import gr.manolis.stelios.footie.core.peristence.dtos.games.Result;
import gr.manolis.stelios.footie.core.peristence.dtos.groups.Season;
import gr.manolis.stelios.footie.core.peristence.dtos.rounds.GroupsRound;
import gr.manolis.stelios.footie.core.peristence.dtos.rounds.PlayoffsRound;
import gr.manolis.stelios.footie.core.peristence.dtos.rounds.QualsRound;
import gr.manolis.stelios.footie.core.services.*;
import org.apache.commons.lang3.RandomUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class OperationsService {

	@Autowired
	private SeasonService seasonService;

	@Autowired
	private QualsService qualsService;

	@Autowired
	private GroupsRoundService groupsRoundService;

	@Autowired
	private PlayoffsRoundService playoffsRoundService;

	@Autowired
	private GameService gameService;

	public Season createSeason() {
		return seasonService.createSeason();
	}

	public Season setUpSeason() {
		return seasonService.setUpSeason();
	}

	public QualsRound seedQualsRound0() {
		return qualsService.seedPreliminary();
	}

	public QualsRound setQualsRound0() {
		return qualsService.setUpPreliminary();
	}

	public QualsRound seedQualsRound1() {
		return qualsService.seedUpQualsRound1();
	}

	public QualsRound setQualsRound1() {
		return qualsService.setUpQualsRound1();
	}

	public QualsRound seedQualsRound2() {
		return qualsService.seedUpQualsRound2();
	}

	public QualsRound setQualsRound2() {
		return qualsService.setUpQualsRound2();
	}

	public GroupsRound seedGroupsRoundOf12() {
		return groupsRoundService.seedGroupsRoundOf12();
	}

	public GroupsRound setGroupsRoundOf12() {
		return groupsRoundService.setUpGroupsRoundOf12();
	}

	public GroupsRound seedAndSetGroupsRoundOf8() {
		return groupsRoundService.seedAndSetGroupsRoundOf8();
	}

	public PlayoffsRound seedAndSetQuarterfinals() {
		return playoffsRoundService.seedAndSetQuarterfinals();
	}

	public PlayoffsRound seedAndSetSemifinals() {
		return playoffsRoundService.seedAndSetSemifinals();
	}

	public PlayoffsRound seedAndSetFinals() {
		return playoffsRoundService.seedAndSetfinals();
	}

	public Season endSeason() {
		return seasonService.endCurrentSeason();
	}

	public RestResponse fillGamesTEST() {

		while (true) {

			Game next = gameService.getNextGame();

			if (next == null) {
				break;
			}

			gameService.addResult(next, new Result(RandomUtils.nextInt(0, 5), RandomUtils.nextInt(0, 2)));

			System.out.println(next);

		}

		return new RestResponse(RestResponse.SUCCESS, "games added");
	}

	public void addResult(Result result) {
		Game game = gameService.getNextGame();
		gameService.addResult(game, result);
	}
}
