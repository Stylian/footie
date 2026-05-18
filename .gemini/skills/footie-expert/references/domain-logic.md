# Footie Domain Logic & Simulation

## Core Entities
- **Season**: Represents a full cycle of competition.
- **Team**: A football club with stats, trophies, and coefficients.
- **Game**: A single match with home/away teams and a result.
- **Group**: A collection of teams in a round-robin format.
- **Round**: A stage in the season (e.g., GroupsRound, PlayoffsRound).

## Ordering & Coefficients
The system uses specialized tools for ranking teams:
- `CoefficientsOrdering`: Ranks teams based on their historical performance.
- `RobinGroupOrdering`: Ranks teams within a group based on points, head-to-head, etc.
- `AlphabeticalOrdering`: Fallback or specific use case ordering.

## Simulation Process
Simulation is handled by services in `core.services`:
- `SeasonService`: Manages the overall season lifecycle.
- `GameService`: Handles match simulation and result generation.
- `QualsService` / `GroupsRoundService` / `PlayoffsRoundService`: Handle specific tournament stages.

## Data Initialization
- Initial teams are loaded from `teams.txt` (originally in `COPY_TO_USER_FOLDER/footie`).
- The system supports "seeding" based on coefficients to ensure balanced groups.
