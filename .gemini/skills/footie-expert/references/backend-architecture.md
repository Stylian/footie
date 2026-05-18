# Footie Backend Architecture

## Overview
The backend is a **Spring Boot 1.5.1** application using **Java 8**. It manages football simulation logic, persistence, and exposes REST APIs.

## Key Technologies
- **Java 1.8**: Essential for core logic, streams, and lambdas.
- **Spring Boot 1.5.1**: Web, JPA, and dependency injection.
- **Apache Derby**: Embedded SQL database.
- **MapStruct**: Used for DTO <-> Entity mapping.
- **Maven**: Project management and build tool.

## Layered Architecture
1. **API Layer (`gr.manolis.stelios.footie.api`)**:
    - `controllers/`: REST endpoints for UI interaction.
    - `dtos/`: Data Transfer Objects for JSON serialization.
    - `mappers/`: MapStruct interfaces.
2. **Core Logic (`gr.manolis.stelios.footie.core`)**:
    - `peristence.dtos/`: JPA entities (Team, Game, Season, etc.).
    - `services/`: Business logic for game simulation, round management.
    - `tools/`: Specialized ordering and coefficient calculations.

## Database Interaction
- Uses Spring Data JPA.
- Data is stored in `~/footie/data`.
- First run requires `COPY_TO_USER_FOLDER/footie` content to be in `~/footie`.

## Common Tasks
- **Adding a REST Endpoint**: Create a new controller in `api.controllers` and a corresponding DTO if needed.
- **Adding a Simulation Rule**: Modify or add a service in `core.services` or a tool in `core.tools`.
- **Entity Changes**: Update classes in `core.peristence.dtos` and ensure mappers in `api.mappers` are updated.
