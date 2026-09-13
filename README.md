# Airline Reservation System UI

This repository contains the Angular user interface for the Group 3 Airline Reservation System developed for CS492.

## Live Application

The Sprint 1 application is deployed at:

https://airlinereservationgroup3.netlify.app

## Sprint 1 Functionality

The current user interface demonstrates the planned Sprint 1 features, including:

- User registration
- User login
- Flight search
- Flight search criteria
- Flight-details display
- Form validation and user feedback
- Responsive page layouts
- Navigation between the primary application views

## Current Development Status

The deployed application is a functional Angular front-end prototype. At this stage, most business logic is handled within the user interface.

The Spring Boot API and database integration are still under development. Future work will move business rules into the backend service layer and connect the Angular application to the API for authentication, flight data, reservations, validation, and persistent data storage.

## Technology

- Angular
- TypeScript
- HTML
- CSS
- Angular CLI 22.1.2
- npm
- Netlify

## Requirements

Install the following software before running the project locally:

- Node.js
- npm
- Angular CLI, if running Angular commands directly
- A modern web browser

Verify the installations with:

```bash
node --version
npm --version
ng version
```

## Local Installation

1. Extract the submitted project files.
2. Open a terminal in the Angular UI project directory.
3. Install the project dependencies:

```bash
npm install
```

## Running the Application

Start the local development server with:

```bash
npm start
```

Alternatively, use:

```bash
ng serve
```

Open the following address in a browser:

http://localhost:4200

The development server automatically reloads the application when source files are changed.

## Production Build

Create a production build with:

```bash
npm run build
```

Alternatively, use:

```bash
ng build
```

Angular places the compiled files in the `dist/` directory.

## Running Tests

Run the configured unit tests with:

```bash
npm test
```

Testing results and known limitations should be reviewed before the final submission.

## Project Structure

The main Angular source code is located under:

```text
src/
├── app/
├── assets/
├── index.html
├── main.ts
└── styles.css
```

The `app` directory contains the application components, services, models, routes, and other user-interface logic.

## Backend API

The Spring Boot API is maintained separately from this Angular UI. Because the API remains under development, the deployed Sprint 1 application does not yet demonstrate complete backend or database integration.

Refer to the backend project README for API setup, configuration, and startup instructions.

## Submission Notes

The source-code submission should include the Angular source files and configuration files required to install, build, and run the application.

Do not include:

- `node_modules/`
- `.git/`
- Real `.env` files
- Passwords
- API keys
- Database credentials
- SMTP credentials
- JWT secrets

Dependencies can be restored by running `npm install`.

## Group Information

**Course:** CS492
**Project:** Airline Reservation System
**Team:** Group 3
**Sprint:** Sprint 1
