# Footie Project Overview

Footie is a comprehensive football (soccer) management application designed to simulate and manage leagues, seasons, and tournaments. It features a robust backend for complex domain logic and a modern frontend for user interaction.

## Architecture

- **Backend:** Spring Boot (v1.5.1) application using Java 1.8. It employs a layered architecture:
    - **API Layer:** REST controllers (`gr.manolis.stelios.footie.api.controllers`) and DTOs.
    - **Core Logic:** Domain entities (`gr.manolis.stelios.footie.core.peristence.dtos`), services (`gr.manolis.stelios.footie.core.services`), and tools for simulation and ordering.
    - **Persistence:** Spring Data JPA with an embedded Apache Derby database.
- **Frontend:** React-based UI located in the `ui` directory. It communicates with the backend via REST APIs.
- **Database:** Embedded Apache Derby. Data is stored in `${user.home}/footie/data`.

## Building and Running

### Prerequisites
- Java 8 (JDK 1.8)
- Maven
- Node.js (v20.17.0) and npm (v10.8.2) - managed by Maven but can be run independently.

### Standard Build & Run
To build the entire project (including the UI) and run it:

```bash
# From the project root (footie folder)
mvn install
java -jar target/footie-2.0.jar
```

### Development Mode

#### Running the Backend
You can run the Spring Boot application from your IDE or via Maven:
```bash
mvn spring-boot:run
```
The API will be accessible at `http://localhost:8080`.

#### Running the UI Independently
For UI development with hot reloading:
```bash
cd ui
npm install
npm start
```
The UI will run at `http://localhost:3000`. 

**Note:** When debugging the UI separately, you may want to comment out the `frontend-maven-plugin` in `pom.xml` to speed up backend builds.

## Setup Instructions

1.  **Configuration:** Copy the `footie` configuration folder from `COPY_TO_USER_FOLDER` to your user home directory (`~/footie`).
2.  **Database:** The first run of `mvn install` or starting the app will create a test database in `~/footie/data`.

## Development Conventions

- **RESTful API:** All backend interactions should follow REST principles.
- **Mapping:** MapStruct is used for entity-to-DTO mapping (`gr.manolis.stelios.footie.api.mappers`).
- **Styling:** The UI uses CSS and Bootstrap (via webjars in the backend, and likely standard imports in the frontend).
- **Testing:**
    - Backend: JUnit and Mockito (`src/test`).
    - Frontend: Jest and React Testing Library (`ui/src/App.test.js`).

## Key Files & Directories

- `pom.xml`: Root Maven configuration.
- `ui/`: React frontend source code and configuration.
- `src/main/java/`: Java backend source code.
- `src/main/resources/application.properties`: Backend configuration (DB path, ports, etc.).
- `COPY_TO_USER_FOLDER/`: Contains initial configuration files required in the user's home directory.
- `build.sh`: A shell script for automated builds.
- `docker-compose.yml` & `Dockerfile.react`: Support for containerized deployment.
