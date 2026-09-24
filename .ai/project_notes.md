# Footie Project Overview

Footie is a comprehensive football (soccer) management application designed to simulate and manage leagues, seasons, and tournaments. It features a robust backend for complex domain logic and a modern frontend for user interaction.

## Architecture

### Backend

- **Java 21** with **Spring Boot 3.4.0** (Jakarta EE 10+)
- **Apache Derby** embedded SQL database
- **MapStruct** for DTO <-> Entity mapping
- **Gradle** build tool

#### Layered Architecture

1. **API Layer (`gr.manolis.stelios.footie.api`)**:
   - `controllers/`: REST endpoints for UI interaction
   - `dtos/`: Data Transfer Objects for JSON serialization
   - `mappers/`: MapStruct interfaces
2. **Core Logic (`gr.manolis.stelios.footie.core`)**:
   - `peristence.dtos/`: JPA entities (Team, Game, Season, etc.)
   - `services/`: Business logic for game simulation, round management
   - `tools/`: Specialized ordering and coefficient calculations

### Frontend

- **React** application in the `ui/` directory (bootstrapped with Create React App)
- **Vanilla CSS / Bootstrap** for styling
- **Fetch API** for backend communication

#### Directory Structure

- `ui/src/components/`: Primary UI components (Season, Team, Player, Admin)
- `ui/src/history_components/`: Specific views for historical data (Coefficients, Stats)
- `ui/src/season_components/`: Components for different stages of a season (Quals, Groups, Knockouts)

### Database

- Spring Data JPA with embedded Apache Derby
- Data stored in relative `data/` directory inside working folder
- First run auto-loads `teams.txt` configuration

## Building and Running

### Prerequisites
- Java 21 (JDK 21)
- Gradle
- Node.js (v20.17.0) and npm (v10.8.2) - managed by Gradle but can be run independently.

### Standard Build & Run
```bash
./gradlew build
java -jar build/libs/footie-2.0.jar
```

### Development Mode

#### Running the Backend
```bash
./gradlew bootRun
```
The API will be accessible at `http://localhost:8080`.

#### Running the UI Independently
```bash
cd ui
npm install
npm start
```
The UI will run at `http://localhost:3000`.

**Note:** When debugging the UI separately, you can skip the frontend build by using the `-x copyWebApp` flag.

## Setup Instructions

1. **Configuration & Database:** The application is fully portable. The database (`data/`), configuration (`teams.txt`), and logs (`logs/`) are initialized and stored entirely inside the application's working directory at launch.

## Development Conventions

- **RESTful API:** All backend interactions should follow REST principles.
- **Mapping:** MapStruct is used for entity-to-DTO mapping (`gr.manolis.stelios.footie.api.mappers`).
- **Styling:** The UI uses CSS and Bootstrap (via webjars in the backend, and likely standard imports in the frontend).
- **Header naming:** Table column headers (e.g. Pos, Team, Coefficients) = **small headers**. Section/card titles (e.g. Seeded, Unseeded, Coefficients, Seeding, Pot 1) = **large headers**. Small headers use smaller underlined text; large headers are the section bars.
- **Testing:**
  - Backend: JUnit and Mockito (`src/test`).
  - Frontend: Jest and React Testing Library (`ui/src/App.test.js`).
- **Packaging:** The AI coding assistant must NOT run the `build.sh` script or handle any packaging/distribution commands directly. Packaging and release builds are strictly managed by the user.

## Key Files & Directories

- `build.gradle`: Root Gradle configuration.
- `ui/`: React frontend source code and configuration.
- `src/main/java/`: Java backend source code.
- `src/main/resources/application.properties`: Backend configuration (DB path, ports, etc.).
- `build.sh`: A shell script for automated builds.

## Domain Logic & Simulation

### Core Entities
- **Season**: Represents a full cycle of competition
- **Team**: A football club with stats, trophies, and coefficients
- **Game**: A single match with home/away teams and a result
- **Group**: A collection of teams in a round-robin format
- **Round**: A stage in the season (e.g., GroupsRound, PlayoffsRound)

### Ordering & Coefficients
The system uses specialized tools for ranking teams:
- `CoefficientsOrdering`: Ranks teams based on historical performance
- `RobinGroupOrdering`: Ranks teams within a group based on points, head-to-head, etc.
- `AlphabeticalOrdering`: Fallback or specific use case ordering

### Simulation Process
- `SeasonService`: Manages the overall season lifecycle
- `GameService`: Handles match simulation and result generation
- `QualsService` / `GroupsRoundService` / `PlayoffsRoundService`: Handle specific tournament stages

### Coefficient Points Calculation Rules

#### Cumulative Calculation
A team's total coefficient rating is the sum of all points earned in prior completed seasons.

#### Achievement/Bonus Points
Points are awarded for reaching specific milestones:
- **Qualifying Round 1 Promotion**: 500 points
- **Qualifying Round 2 Promotion**: 700 points
- **Groups Round 1 (Groups 12)**:
  - 1st Place: 600 points
  - 2nd Place: 300 points
- **Groups Round 2 (Groups 8)**:
  - 1st Place: 2000 points
  - 2nd Place: 600 points
  - 3rd Place: 300 points
- **Promotion to Playoffs Final**: 1000 points
- **Winning the League**: 2000 points

#### Match-Based Points
Base values for match-based performance:
- **Win**: 1000 points
- **Draw**: 500 points
- **Goal Scored**: 100 points per goal

Scaling rules:
- **Matchups (Qualifying Rounds & Playoffs)**:
  - Quals & Playoffs Quarters: Points = (2 × Accumulated Match Points) / Number of Games
  - Playoffs Semis & Finals: Points = (4 × Accumulated Match Points) / Number of Games
- **Group Stage Games (Groups Round 1 & 2)**:
  - Points awarded **only to the home team** for home matches (Win = 1000, Draw = 500, 100 points per goal scored at home). No coefficient points to the away team.

## Core Workflows

### Backend Development
When modifying the backend, ensure compatibility with **Java 21**. Use the layered architecture:
1. Define/Update Entities in `core.peristence.dtos`
2. Update/Create Services in `core.services` for business logic
3. Expose functionality via Controllers in `api.controllers`
4. Map entities to DTOs using MapStruct in `api.mappers`

### Frontend Development
- Use `DataLoaderManager` for consistent data fetching
- Manage tab state via `TabsPersistanceManager`
- Components are modularly organized in `ui/src/components`

### Simulation & Rules
- For new ranking rules, implement or modify an `Ordering` tool
- For season lifecycle changes, check `SeasonService`

## Testing

- **Backend**: `./gradlew test`

## Stand-alone Deployment Verification Procedure
1. **Build**: Run `./build.sh` (using Git Bash on Windows)
2. **Extract**: Unzip `Launcher.zip` into a temporary folder
3. **Execute**: Start the standalone application by executing `footie.bat` or `footie.sh`
4. **Test**: Query backend views (e.g. `http://localhost:8080/rest/admin/general_data`)
5. **Clean Up**: Terminate the launched background process and delete the temporary directory

## E2E Season Simulation & Coefficient Verification Procedure
1. **Start Backend**: Run `.\gradlew bootRun` (or the standalone launcher)
2. **Simulate Seasons**: Run 2 complete seasons sequentially:
   - Create season: `POST /rest/ops/season/create`
   - If season > 1, run Quals 0: `POST /rest/ops/quals/0/set` -> `GET /rest/ops/fill` -> `GET /rest/next_game`
   - Run Quals 1: `POST /rest/ops/quals/1/set` -> `GET /rest/ops/fill` -> `GET /rest/next_game`
   - Run Quals 2: `POST /rest/ops/quals/2/set` -> `GET /rest/ops/fill` -> `GET /rest/next_game`
   - Run Groups 1: `POST /rest/ops/groups/1/set` -> `GET /rest/ops/fill` -> `GET /rest/next_game`
   - Complete remaining rounds: Call `GET /rest/ops/fill` -> `GET /rest/next_game` exactly 4 more times
3. **Verify Coefficients**:
   - Fetch calculated coefficients: `GET /rest/history/coefficients`
   - Fetch team stats history: `GET /rest/history/stats`
   - Verify team's `coefficients` matches `stats.points`
4. **Clean Up**: Terminate the launched background process
