# Footie Setup & Development Guide

## Prerequisites
- **Java JDK 21**: The application is now upgraded to Java 21.
- **Gradle**: To build the backend and manage dependencies.
- **Node.js (v20+) & npm**: To build and run the React UI.

## Initial Setup
1.  **Configuration & Database**: The application is fully portable. The launcher (`footie.bat` or `footie.sh`) starts the application, which reads the local `teams.txt` configuration and initializes the database (`data/`) and logs (`logs/`) directories directly inside the launcher folder on first run.

## Build Commands
- **Full Build (Backend + UI)**:
  ```bash
  ./gradlew build
  ```
  This will bundle the UI into the backend's static resources.

- **Run Backend**:
  ```bash
  ./gradlew bootRun
  ```
  Accessible at `http://localhost:8080`.

- **Run UI (Dev Mode)**:
  ```bash
  cd ui
  npm install
  npm start
  ```
  Accessible at `http://localhost:3000`.

## Testing
- **Backend**: `./gradlew test`
- **Frontend**: `cd ui && npm test`

## AI Assistant Guidelines
- **No Packaging**: The AI coding assistant must NOT run the `build.sh` script or execute any packaging/release commands. Build/packaging execution is exclusively the user's task.
