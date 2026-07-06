# Footie Project Overview

Footie is a comprehensive football (soccer) management application designed to simulate and manage leagues, seasons, and tournaments. It features a robust backend for complex domain logic and a modern frontend for user interaction.

## Architecture

- **Backend:** Spring Boot (v3.4.0) application using Java 21. It employs a layered architecture:
    - **API Layer:** REST controllers (`gr.manolis.stelios.footie.api.controllers`) and DTOs.
    - **Core Logic:** Domain entities (`gr.manolis.stelios.footie.core.peristence.dtos`), services (`gr.manolis.stelios.footie.core.services`), and tools for simulation and ordering.
    - **Persistence:** Spring Data JPA with an embedded Apache Derby database.
- **Frontend:** React-based UI located in the `ui` directory. It communicates with the backend via REST APIs.
- **Database:** Embedded Apache Derby. Data is stored in `${user.home}/footie/data`.

## Building and Running

### Prerequisites
- Java 21 (JDK 21)
- Gradle
- Node.js (v20.17.0) and npm (v10.8.2) - managed by Gradle but can be run independently.

### Standard Build & Run
To build the entire project (including the UI) and run it:

```bash
# From the project root (footie folder)
./gradlew build
java -jar build/libs/footie-2.0.jar
```

### Development Mode

#### Running the Backend
You can run the Spring Boot application from your IDE or via Gradle:
```bash
./gradlew bootRun
```
The API will be accessible at `http://localhost:8080`.
...
#### Running the UI Independently
For UI development with hot reloading:
```bash
cd ui
npm install
npm start
```
The UI will run at `http://localhost:3000`. 

**Note:** When debugging the UI separately, you can skip the frontend build by using the `-x copyWebApp` flag.

## Setup Instructions

1.  **Configuration & Database:** The application automatically initializes the configuration directory (`~/footie`) and copies `teams.txt` on the first launch of `launcher.bat` or `launcher.sh`. The first run will also create the database in `~/footie/data`.

## Development Conventions

- **RESTful API:** All backend interactions should follow REST principles.
- **Mapping:** MapStruct is used for entity-to-DTO mapping (`gr.manolis.stelios.footie.api.mappers`).
- **Styling:** The UI uses CSS and Bootstrap (via webjars in the backend, and likely standard imports in the frontend).
- **Testing:**
    - Backend: JUnit and Mockito (`src/test`).
    - Frontend: Jest and React Testing Library (`ui/src/App.test.js`).

## Key Files & Directories

- `build.gradle`: Root Gradle configuration.
- `ui/`: React frontend source code and configuration.
- `src/main/java/`: Java backend source code.
- `src/main/resources/application.properties`: Backend configuration (DB path, ports, etc.).
- `build.sh`: A shell script for automated builds.
