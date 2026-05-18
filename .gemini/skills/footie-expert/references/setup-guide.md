# Footie Setup & Development Guide

## Prerequisites
- **Java JDK 1.8**: The application will not build or run correctly on newer Java versions without modifications.
- **Maven**: To build the backend and manage dependencies.
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
  mvn clean install
  ```
  This will bundle the UI into the backend's static resources.

- **Run Backend**:
  ```bash
  mvn spring-boot:run
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
- **Backend**: `mvn test`
- **Frontend**: `cd ui && npm test`
