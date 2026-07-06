# Footie Setup & Development Guide

## Prerequisites
- **Java JDK 21**: The application is now upgraded to Java 21.
- **Gradle**: To build the backend and manage dependencies.
- **Node.js (v20+) & npm**: To build and run the React UI.

## Initial Setup
1.  **Configuration**: The launcher (`launcher.bat` or `launcher.sh`) automatically creates the configuration folder at `~/footie` and copies `teams.txt` into it on first run.
2.  **Database**: The database is created automatically in `~/footie/data` on the first run.

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
