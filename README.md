# Perlego Survey (React + Firebase)

Lightweight survey application with an admin dashboard to manage questions, collect responses, and view simple statistics. The front-end is a React app and it uses Firebase for auth, Firestore and storage.

**Highlights**

- Create and manage a single active survey (title, description, questions)
- Collect responses and store them in Firestore
- Admin UI with protected routes for managing questions, responses and contacts
- Basic statistics (counts, averages, distributions)

## Tech stack

- Frontend: React (Create React App), React Router
- Backend services: Firebase (Auth, Firestore)
- Optional server utilities: Express

## Quick start

Prerequisites:

- Node.js 16+ and npm
- A Firebase project with Web app credentials

1. Clone the repository

```bash
git clone <repo-url>
cd perlego
```

2. Install dependencies

```bash
npm install
```

3. Configure Firebase credentials

Create a `.env` file in the project root with the following variables (replace values from your Firebase console):

```
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

4. Run development server

```bash
npm start
```

Open http://localhost:3000. Public pages include the home page and the survey form at `/survey`. Admin pages are under `/admin` and require authentication.

## Available scripts

- `npm start` — development server
- `npm run build` — production build
- `npm test` — run tests

These scripts are the defaults created by Create React App and are defined in `package.json`.

## Configuration & structure

- Firebase initialization: `src/firebase/config.js` (reads env vars)
- Firestore helpers: `src/firebase/server.js` (survey, responses, contacts, statistics)
- Routes and pages: `src/App.jsx`, `src/pages/*`
- Admin UI components: `src/components/AdminLayout.jsx`, `src/components/QuestionsManager.jsx`, `src/components/ResponsesViewer.jsx`

## Usage notes

- Public survey path: `/survey` — submits answers to the `responses` collection in Firestore.
- Admin dashboard: `/admin` — protected by `ProtectedRoute` and uses Firebase Authentication.
- To change the active survey content, use the admin UI which updates the `surveys/activeSurvey` document.

Report issues via the repository Issues tab.

## Where to get help

- Review source files under `src/` to understand behavior, especially `src/firebase/server.js` for data operations.

## Maintainers

- Current codebase owner: TaranuMircea

---
