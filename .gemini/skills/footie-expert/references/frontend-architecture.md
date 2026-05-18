# Footie Frontend Architecture

## Overview
The UI is a **React** application (bootstrapped with Create React App) located in the `ui/` directory.

## Key Technologies
- **React**: Component-based UI.
- **Vanilla CSS / Bootstrap**: For styling and layout.
- **Fetch API**: For communicating with the backend REST services.

## Directory Structure
- `ui/src/components/`: Primary UI components (Season, Team, Player, Admin).
- `ui/src/history_components/`: Specific views for historical data (Coefficients, Stats).
- `ui/src/season_components/`: Components for different stages of a season (Quals, Groups, Knockouts).

## UI-Backend Interaction
- The UI typically fetches data on component mount or via a `DataLoaderManager`.
- Persistence of UI state (like active tabs) is handled by `TabsPersistanceManager.js`.

## Common Tasks
- **Creating a New View**: Add a component in `ui/src/components` and wire it into `App.js` or `PageLoader.jsx`.
- **Updating Styles**: Modify `App.css` or component-specific CSS files.
- **Handling New API Data**: Update the relevant component's state and fetch logic to handle new backend DTOs.
