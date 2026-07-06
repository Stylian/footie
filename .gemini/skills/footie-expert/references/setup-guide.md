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

## Stand-alone Deployment Verification Procedure
If requested by the user to verify a deployment:
1. **Build**: Run `./build.sh` (using Git Bash on Windows).
2. **Extract**: Unzip `Launcher.zip` into a temporary folder inside the conversation's scratch directory: `<appDataDir>\brain\<conversation-id>\scratch\test_launcher`.
3. **Execute**: Start the standalone application by executing `footie.bat` (on Windows) or `footie.sh` (on Unix) from inside the scratch folder.
4. **Test**: Query the backend views (e.g. `http://localhost:8080/rest/admin/general_data`) to ensure that the database (`data/`) initializes locally inside the directory, and that `teams.txt` is resolved and loaded successfully.
5. **Clean Up**: Terminate the launched background process and delete the temporary `test_launcher` directory from the scratch workspace.
