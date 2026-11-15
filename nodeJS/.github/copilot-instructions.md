# Copilot Instructions for this project

## Project overview
This repository is a Node.js + Express backend for an e-commerce-style application using MongoDB and Mongoose.

## Main architecture
- Entry point: app.js
- Database connection: database.js
- Configuration: config.js
- Routers: routers/
- Controllers: controller/
- Models: models/
- Middleware: middleware/

## Coding conventions
- Use ES module syntax: import / export.
- Keep the existing project structure when adding new features.
- Prefer adding a new router, controller, and model for each domain.
- Use async/await and try/catch in controller methods.
- Return clear HTTP responses with status codes and JSON bodies.
- Preserve existing naming patterns such as getAll, getById, addX, updateX, deleteX.

## API structure
- Routes are mounted in app.js.
- Each resource should usually have:
  - a router file in routers/
  - a controller file in controller/
  - a model file in models/
- Example route style:
  - /users/getAll
  - /users/getById/:id
  - /users/addUser
  - /users/updateUser/:id
  - /users/deleteUser/:id

## Authentication and authorization
- Authentication middleware is used for protected routes.
- Respect existing middleware usage such as verifyToken and verifyAdmin.
- Do not weaken security rules unless explicitly requested.

## Database and models
- Mongoose models live in models/.
- Use schema definitions with clear field names and validation.
- Keep collection names consistent with the current project style.
- When changing a model, consider whether controller and router logic must also be updated.

## When making changes
- Read the relevant router, controller, and model before editing.
- Keep changes minimal and focused.
- If a new route is added, make sure it is mounted in app.js.
- If a new dependency is needed, update package.json and explain why.

## Preferred behavior for AI assistance
- Suggest code changes that match the existing style of the repository.
- Avoid unnecessary refactors.
- Preserve functionality unless the task explicitly asks for a change.
- Prefer practical, production-ready implementations over overly abstract ones.