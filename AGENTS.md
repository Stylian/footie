# Agent Instructions

Read `.ai/ai_notes.md` for AI guidelines and `.ai/project_notes.md` for project details. Read the latest `.ai/logs/` file for recent context.

## Running the app (dev) — follow this exactly

When the user says "run the app" / "run dev", do the simple thing:

- Backend: `.\gradlew bootRun -x buildUi`
- UI: run separately in `ui/` via `npm start` (http://localhost:3000)

Never run a full `bootRun` (it rebuilds the UI via `processResources` -> `buildUi`) and never run `npm run build`, `clean`, or `build.sh` unless the user explicitly asks. Packaging/release builds are the user's job. Keep launches fast (~8-15s).
