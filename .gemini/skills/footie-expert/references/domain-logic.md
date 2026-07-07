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
- Initial teams are loaded from `teams.txt` (which is copied to `~/footie/teams.txt` automatically by the launcher scripts).
- The system supports "seeding" based on coefficients to ensure balanced groups.

## Coefficient Points Calculation Rules

### 1. Cumulative Calculation
A team's total coefficient rating is the sum of all points earned in prior completed seasons.

### 2. Achievement/Bonus Points
Points are awarded for reaching specific milestones:
* **Qualifying Round 1 Promotion**: `500` points
* **Qualifying Round 2 Promotion**: `700` points
* **Groups Round 1 (Groups 12)**:
  * **1st Place**: `600` points
  * **2nd Place**: `300` points
* **Groups Round 2 (Groups 8)**:
  * **1st Place**: `2000` points
  * **2nd Place**: `600` points
  * **3rd Place**: `300` points
* **Promotion to Playoffs Final**: `1000` points
* **Winning the League**: `2000` points

### 3. Match-Based Points
The base values for match-based performance are:
* **Win**: `1000` points
* **Draw**: `500` points
* **Goal Scored**: `100` points per goal

These points are scaled and applied as follows:
* **Matchups (Qualifying Rounds & Playoffs)**:
  * Quals & Playoffs Quarters: $\text{Points} = \frac{2 \times \text{Accumulated Match Points}}{\text{Number of Games}}$
  * Playoffs Semis & Finals: $\text{Points} = \frac{4 \times \text{Accumulated Match Points}}{\text{Number of Games}}$
* **Group Stage Games (Groups Round 1 & 2)**:
  * Points are awarded **only to the home team** for its home matches (Win = `1000`, Draw = `500`, and `100` points per goal scored at home). No coefficient points are awarded to the away team.

