---
name: footie-expert
description: Specialized expert for the Footie football management and simulation project. Use this skill for any tasks related to the Footie project, including backend development (Java 21, Spring Boot 3.4.0), frontend development (React), and domain-specific football simulation logic.
---

# Footie Expert

This skill provides specialized assistance for the Footie project, a full-stack football simulation application.

## Quick Start

- **Understand Architecture**: Read [backend-architecture.md](references/backend-architecture.md) and [frontend-architecture.md](references/frontend-architecture.md).
- **Learn Domain Logic**: Review [domain-logic.md](references/domain-logic.md) for info on seasons, teams, and coefficients.
- **Setup & Run**: See [setup-guide.md](references/setup-guide.md) for prerequisites and build commands.

## Core Workflows

### Backend Development
When modifying the backend, always ensure compatibility with **Java 21**. Use the layered architecture:
1.  Define/Update Entities in `core.peristence.dtos`.
2.  Update/Create Services in `core.services` for business logic.
3.  Expose functionality via Controllers in `api.controllers`.
4.  Map entities to DTOs using MapStruct in `api.mappers`.

### Frontend Development
The UI is a React app in the `ui/` directory.
- Use `DataLoaderManager` for consistent data fetching.
- Manage tab state via `TabsPersistanceManager`.
- Components are modularly organized in `ui/src/components`.

### Simulation & Rules
Simulation logic is centralized in the `core.services` and `core.tools` packages.
- For new ranking rules, implement or modify an `Ordering` tool.
- For season lifecycle changes, check `SeasonService`.

## Build & Test
Always verify changes by running:
- `./gradlew build` (Full integration check)
- `./gradlew test` (Backend unit tests - clean, in-memory)
- `./gradlew devTest` (Backend unit tests - runs on a persistent database at `~/footie/dev-test-data` without deleting it on shutdown)
- `cd ui && npm test` (Frontend tests)
