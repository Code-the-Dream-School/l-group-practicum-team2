# PawMatch

## Overview

A fullstack pet adoption application with a Node.js backend and React frontend that allows users to browse animals, view details, save favorites, and submit adoption requests.

## Live Demo

#### Frontend Live Site: https://your-github-pages-link.com

#### Frontend Repo: https://github.com/Code-the-Dream-School/l-group-practicum-team2/tree/main/frontend

#### Backend Repo: https://github.com/Code-the-Dream-School/l-group-practicum-team2/tree/main/backend

## Problem Statement

This project is a platform that helps people find and adopt pets by connecting them with animal shelters in one place. It makes it easy to browse and filter available pets, solving the problem of outdated listings and limited visibility. Users can quickly find animals that match their needs and express interest directly. Overall, it makes the adoption process faster, easier, and helps more pets find homes.

## MVP Features Supported

- Homepage with featured animals
- Browse animals with filters (species, age, size, location)
- View detailed information for a single animal
- User signup and login
- Save and remove favorited animals
- View all saved/favorite animals
- Submit adoption inquiries

## Future Features (Post-MVP)

- Add Admin Control Panel (with full CRUD access to all users, animals and shelters)
- Add create/update/delete functions of animals by shelters in backend controller and frontend pages.
- Compatibility quiz or matching score
- Shelter admin dashboard
- In-app messaging
- Adoption status tracking
- Map view of nearby shelters
- Email notifications
  (- Provide data for the "Need Extra Love" (senior/special needs) section )

## Tech Stack

### Backend:

- **Node.js** — runtime environment for running JavaScript on the server
- **Express.js** — web framework for building REST APIs and handling routes
- **bcrypt** — library for hashing and securing user passwords
- **JWT (JSON Web Token)** — used for authentication and managing user sessions

### Frontend:

- **React.js** — for building the user interface
- **Bootstrap** — for responsive styling and layout
- **Vite** — a build tool with instant reload for development
- **React Router** — for page navigation
- **Fetch API** — for communication with the backend API

### Database:

- **PostgreSQL** — relational database for storing application data
- **pg** — Node.js client for connecting to PostgreSQL

### Tooling

- Git & GitHub
- dotenv (environment variables)
- ESLint / Prettier

### Design:

- **Figma** — for wireframes, UI design, and prototyping

## Installation

Clone the repo:

```
git clone https://github.com/Code-the-Dream-School/l-group-practicum-team2

cd l-group-practicum-team2
```

## 📁 Project Structure

```
l-group-practicum-team2/
├── backend/          # Node.js + Express backend
|   ├── src/
|   |   ├── config/
|   |   ├── controllers/    # Business logic CRUD (animals/shelters/favorites/auth)
|   |   ├── db/
|   |   |   ├── index.js   # PostgreSQL connection (pg Pool)
|   |   |   ├── schema.sql # Database schema (table definitions)
|   |   |   └── seed.sql   # Mock data for database
|   |   ├── errors/        # Error handlers
|   |   ├── middleware/    # Auth & validation middleware
|   |   ├── routes/        # API routes
|   |   └── app.js
|   ├── package.json
|   ├── .env.example
|   └── server.js
├── frontend/       # React frontend (Vite or CRA)
|   ├── src/
|   │   ├── assets/      # Images/icons
|   │   ├── components/  # Reusable UI components
|   │   ├── context/     # Global state (animals/shelters/favorites/auth)
│   |   ├── services/    # API calls (animals/shelters/favorites/auth)
│   |   ├── utils/       # Helper functions
│   |   ├── App.jsx  # The root component of UI
|   |   ├── App.css
│   |   └── main.jsx (Vite) / index.js (CRA) # Entry point
|   ├── index.html
|   ├── .env.example
|   ├── package.json
├── .gitignore
└── README.md
```

## Setup and Installation

### Prerequisites

- Node.js (v18+ recommended)
- npm
- PostgreSQL (local or cloud)

### Backend Setup

```
cd backend
npm install
npm start
```

Create a .env file inside the backend folder:

```
PORT=8080
DATABASE_URL=your_neon_connection_string
JWT_SECRET=your_secret_key
FRONTEND_URL=http://localhost:5173
```

Backend runs on:
http://localhost:8080

### Database Setup (Neon)

1. Create an account at https://neon.com
2. Create a new project
3. Copy your connection string
4. Add it to your `.env` file:

```
DATABASE_URL=your_neon_connection_string
```

### Create Database Tables

After setting up your database in Neon, run the following command in your terminal:

```bash
npm run db:schema
```

### Seed Data

After creating the tables, run the seed file in terminal to insert data

```bash
npm run db:seed
```

### Database Index Migration

Run the following command to apply animal filter indexes:

```bash
psql $DATABASE_URL -f src/db/20260517_add_animal_filter_indexes.sql
```

### Frontend Setup

```
cd frontend
npm install
npm run dev (vite)
```

Create a .env file inside the frontend folder:

```
VITE_API_BASE_URL=http://localhost:8080
```

- Make sure backend is running before frontend requests

Frontend will run on: http://localhost:5173 (VITE)

## API Routes

#### Auth

- `POST /api/auth/signup` — create a new user
- `POST /api/auth/login` — log in a user
- `GET /api/auth/me` — get current logged-in user

#### Animals

- `GET /api/animals` — get all animals
- `GET /api/animals/:id` — get one animal by ID
- `GET /api/animals?species=dog&age=young&size=small&location=columbus` - filter animals
<!-- - `POST /api/animals` - create new animal
- `PATCH /api/animals/:id` — update animal by ID
- `DELETE /api/animals/:id` — delete animal by ID -->

#### Shelters

- `GET /api/shelters/:id` — get shelter information

<!-- - `GET /api/shelters` — get all shelter information
- `POST /api/shelters` - create new shelter
- `PATCH /api/shelters/:id` — update shelter by ID
- `DELETE /api/shelters/:id` — delete shelter by ID  -->

#### Favorites

- `POST /api/favorites` — save/favorite an animal
- `GET /api/favorites` — get user's saved/favorite animals
- `DELETE /api/favorites/:animalId` — remove an animal from favorites

#### Inquiries

- `POST /api/inquiries` — submit an adoption inquiry
- `GET /api/inquiries` — get user inquiries (optional for future use)

#### Featured (Homepage)

- `GET /api/animals/featured/need-extra-love` — get senior or special-needs animals

## Database Schema

#### Users

| Column        | Type      | Description          |
| ------------- | --------- | -------------------- | ----------- | --- |
| id            | UUID      | Primary key          |
| name          | STRING    | User name            |
| email         | STRING    | Unique email address |
| password_hash | STRING    | Hashed password      |
| location      | STRING    | User location        |
| created_at    | TIMESTAMP | Record creation time |
| <!--          | role      | ENUM                 | USER, ADMIN | --> |

---

#### Shelters

| Column        | Type   | Description          |
| ------------- | ------ | -------------------- |
| id            | UUID   | Primary key          |
| name          | STRING | Shelter name         |
| address       | STRING | Street address       |
| city          | STRING | City                 |
| contact_email | STRING | Contact email        |
| phone         | STRING | Contact phone number |

---

#### Animals

| Column        | Type      | Description                         |
| ------------- | --------- | ----------------------------------- |
| id            | UUID      | Primary key                         |
| shelter_id    | UUID      | Foreign key → Shelters              |
| name          | STRING    | Animal name                         |
| species       | STRING    | Animal type (dog, cat, etc.)        |
| breed         | STRING    | Breed                               |
| age_years     | FLOAT     | Age in years                        |
| age_category  | ENUM      | young, adult, senior                |
| size          | ENUM      | small, medium, large                |
| special_needs | BOOLEAN   | Indicates special care requirements |
| temperament   | TEXT      | Behavior description                |
| description   | TEXT      | Detailed info                       |
| photo_url     | STRING    | Image URL                           |
| status        | ENUM      | available, adopted                  |
| created_at    | TIMESTAMP | Record creation time                |

---

#### Favorites

| Column     | Type      | Description           |
| ---------- | --------- | --------------------- |
| id         | UUID      | Primary key           |
| user_id    | UUID      | Foreign key → Users   |
| animal_id  | UUID      | Foreign key → Animals |
| created_at | TIMESTAMP | Record creation time  |

---

#### Inquiries

| Column     | Type      | Description           |
| ---------- | --------- | --------------------- |
| id         | UUID      | Primary key           |
| user_id    | UUID      | Foreign key → Users   |
| animal_id  | UUID      | Foreign key → Animals |
| message    | TEXT      | User inquiry message  |
| status     | ENUM      | sent, reviewed        |
| created_at | TIMESTAMP | Record creation time  |

## Frontend Routes

#### `/` — Homepage

- Hero section / Featured animal cards
- Search bar (Sticky navbar)
- Quick filters (by species) (Sticky navbar)
- “Need Extra Love” section (v2?)

#### `/animals` — Browse Animals

- Filter sidebar
- Animal cards grid
- Pagination
- Sorting options

#### `/animals/:id` — Animal Details

- Animal photo
- Name, age, size, species
- Temperament and description
- Shelter information
- Save (favorite) button
- Adoption inquiry CTA

#### `/signup` — Sign Up

- User registration form

#### `/login` — Login

- User login form

#### `/favorites` — Saved/Favorited Animals

- List of favorited animals
- Option to remove from favorites

#### `/inquiry` - Inquiry Modal

- Message input
- Pre-filled user contact info
- Submit adoption request to shelter

## Team Members

- Aya Dzhaparbekova (dzhaicholpon@gmail.com) - Role
- Heather M. Smith (heathersmith9378@gmail.com)— Role
- Maede Gholipour (Maedegholipour@gmail.com)— Role
- Victor Manual Lameda Rojas (vmlr123@gmail.com) - Role
- Villy Siu (villysiu@gmail.com)— Role
- Volha Padlipskaya (o.podlipskaya@gmail.com) — Role

## Workflow

- GitHub Issues for task tracking
- Feature branches for development
- Pull Requests required for all merges
- Code reviews before merging to main

## Development Process

- Agile / sprint-based workflow
- Backend API built before frontend integration
- MVP defined early
- Incremental feature development

## Known Issues / Limitations

- Limited role-based access control
  -No automated tests yet
- Performance optimizations pending

## Future Improvements

- Add automated testing (Jest, Supertest)
- Improve security and validation
- Add caching and performance improvements
- Dockerize the application

## Acknowledgments

#### Mentors & Instructors

Frank Stepanski, Gina Castromonte, Vera Fesianava
Open-source libraries and tools

## License

This project is for educational purposes only.
