package gr.manolis.stelios.footie.core.peristence.dtos.matchups;

public enum MatchupTieStrategy {
	REPLAY_GAMES,
	REPLAY_GAMES_ONCE,
	HOME_WINS,
	HIGHEST_COEFFICIENT_WINS,
	BEST_POSITION_IN_KNOCKOUTS_TREE,
	HIGHEST_COEFFICIENT_WINS_THEN_RANDOM
}
