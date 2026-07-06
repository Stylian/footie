# Footie Setup & Development Guide

## Prerequisites
- **Java JDK 21**: The application is now upgraded to Java 21.
- **Gradle**: To build the backend and manage dependencies.
- **Node.js (v20+) & npm**: To build and run the React UI.

## Initial Setup
1.  **Configuration**: Copy the `footie` folder from `COPY_TO_USER_FOLDER` to your user home directory:
    ```bash
    cp -r COPY_TO_USER_FOLDER/footie ~/
    ```
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
- **Backend (Default/In-memory)**: `./gradlew test`
- **Backend (Dev Mode / Persistent DB)**: `./gradlew devTest` (Runs tests against a persistent database at `~/footie/dev-test-data` and leaves the data intact for inspection/debugging).
- **Frontend**: `cd ui && npm test`
