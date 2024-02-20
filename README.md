# Stickies Manager

This project is a web application for managing two types of stickies: todos and notes. Users can add, delete, and modify stickies based on their type.

## Running the Project

The project must run with `npm install`, `npm run build`, and `npm start`.

## Stickie Types

### Todos Stickies

- **Add Todo:** Users can create todos with specific tasks.
- **Delete Todo:** Allows users to remove specific todos.
- **Update Todo:** Users can edit and update existing todos.

### Notes Stickies

- **Modify Note:** Users have the ability to modify and update notes.

## User Validation

The application implements user validation using sessions.

## Usage

- **Login:** Users can login to access stickie functionalities.
- **Create Stickies:** Users can create todos or notes stickies.
- **Manage Stickies:** Edit, delete, or update stickies as per the type (todos/notes).
- **Logout:** Users can log out of the application.
- **Refresh:** Users can refresh the application.

## Front End

- The project uses a React-based front end.
- It is a Vite-based SPA and an express-based NodeJS server.

## Services

- Backend/service code uses express-based NodeJS.
- Involves calling REST-based service calls that are written for the project.
- Outside libraries included in the project:
  - express, cookie-parser, uuid, nodemon (development only), eslint, prettier, babel, jest, mocha, chai, sinon, tape

## Security Requirements

- Users have an authentication step using sessions.
- The server responds with a session id cookie for authentication/authorization.
- All service calls have some form of authorization.

Feel free to reach out for any questions or clarifications!
