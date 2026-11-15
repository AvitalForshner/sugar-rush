# Copilot Instructions for This Project

## General Project Overview
This is a React + Vite project for a candy and snack store website with a shopping cart system, login, registration, orders, and static pages. The project is mainly written in JavaScript using React and Redux Toolkit.

## Main Technologies
- React 19
- Vite
- Redux Toolkit
- React Router
- Axios
- CSS/inline styles (there is no need to add new styling libraries unless absolutely necessary)

## Architecture
- The main code is in src
- UI components are in src/components
- Redux slices are in src/slice
- API calls are in src/api
- The store is defined in src/store.js
- The main routing is in src/App.jsx

## Important Working Principles
- Keep the structure clean and organized.
- Use functional components with React hooks.
- Add or change code according to the existing patterns in the project; do not invent a new architecture unless absolutely necessary.
- When working with data, use the API layer in the api folder rather than calling Axios directly from components.
- When global state is needed, use Redux Toolkit in a way similar to the existing slices.
- Keep compatibility with RTL and Hebrew text.

## Local Conventions
- Use camelCase for variable and function names.
- Keep the code style readable with clear structure and semicolons.
- Do not add external libraries unless necessary.
- Keep component names clear and consistent with file names.
- If you change the UI, keep the experience consistent with the existing design.

## Authentication
- User information is stored in localStorage (token and user).
- Authentication is handled through AuthSlice.
- Do not break the login/register/currentUser logic.
- When adding new pages or routes, make sure the integration with auth remains correct.

## Shopping Cart and Orders
- The shopping cart is managed locally in App.jsx and related components.
- When changing cart/orders logic, keep the UI and state consistent.
- Avoid breaking the count, quantity, and checkout flow.

## Search and Products
- Products on the main page are loaded through an API and filtered by search.
- When adding features related to products, follow the same fetch/update/delete principles used in productsSlice.

## Testing and Validation Before Completion
- After making code changes, always verify with:
  - npm run build
  - npm run lint
- If there are errors, fix them before finishing the work.

## Special Instructions for AI
- Do not replace the project with a completely different structure unless requested.
- Preserve support for Hebrew, RTL, and the overall feel of a candy/snack store.
- If you are unsure about a path or API, follow the existing format.
- Stay close to simple, practical, and reliable solutions.
- If you add a new feature, design it to fit the existing structure of components + slices + api.