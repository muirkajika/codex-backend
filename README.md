# Codex Backend - Starter Project

This is the NestJS backend for the Codex Personal Knowledge Management application. It's designed to be run as a Docker container and provides the core API for managing notebooks, notes, and bookmarks.

## Features

- **NestJS Framework:** A robust and scalable Node.js framework.
- **PostgreSQL Integration:** Uses TypeORM to connect to a PostgreSQL database.
- **Configuration-driven:** All important settings (database URL, ports) are managed via environment variables.
- **Docker-ready:** Includes a multi-stage `Dockerfile` for building a lean production image.
- **API Endpoints:**
  - `GET /api`: Health check.
  - `GET /api/notebooks`: Fetches all notebooks.
  - `POST /api/notebooks`: Creates a new notebook.

---

## Local Development

### Prerequisites

- Node.js (v18+)
- pnpm (or npm/yarn)
- Docker (for database)

### Running Locally

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    cd codex-backend
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    ```

3.  **Create a `.env` file:**
    Create a file named `.env` in the root of the project and add your database connection string.
    ```env
    # .env
    DATABASE_URL=postgresql://user:password@localhost:5432/codex_db
    PORT=3001
    ```

4.  **Start a local PostgreSQL database (using Docker):**
    ```bash
    docker run --name codex-postgres-dev -e POSTGRES_USER=user -e POSTGRES_PASSWORD=password -e POSTGRES_DB=codex_db -p 5432:5432 -d postgres:15-alpine
    ```

5.  **Run the application in development mode:**
    ```bash
    pnpm run start:dev
    ```
    The API will be available at `http://localhost:3001`.

---

## Docker Deployment

This project is designed to be deployed as a Docker container, managed by the main Codex `docker-compose.yml`.

### 1. Build the Docker Image

From the root of this `codex-backend` project, run the build command. Replace `your-dockerhub-username` with your actual username.

```bash
docker build -t your-dockerhub-username/codex-backend:0.1.0 .