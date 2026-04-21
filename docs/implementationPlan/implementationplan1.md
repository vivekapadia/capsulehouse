# Capsulehouse Project Setup Plan

This plan outlines the setup of the initial project structure and developer environment based on the `docs/FSD.txt` specification, ensuring a scalable, industry-standard developer experience.

## User Review Required

> [!WARNING]
> **Go is currently not installed on your system.**
> I ran the requested version check commands and found that `go` is missing. You will need to install Go from [https://go.dev/dl/](https://go.dev/dl/) before we can successfully build the backend.

**Version Check Results:**
- Node.js: `v24.15.0` (Installed)
- npm: `11.12.1` (Installed)
- Docker: `29.4.0` (Installed)
- Go: **Not Installed** (`The term 'go' is not recognized`)

## Proposed Changes

We will establish a scalable monorepo-style structure with separate folders for the frontend and backend, orchestrated by Docker Compose for local development (Phase 1).

### Infrastructure Setup

#### [NEW] docker-compose.yml
- Create a `docker-compose.yml` at the root of the project to orchestrate local development.
- Include services for `postgres` (database), `backend` (Go API), and `frontend` (Next.js).

#### [NEW] .gitignore
- Setup a standard `.gitignore` for Node.js, Go, and environment files.

### Frontend Setup (Next.js)

#### [NEW] frontend/
- Initialize a new Next.js project with Tailwind CSS using `npx create-next-app@latest frontend --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"`.
- This will serve as the "virtual showroom" with high-end digital presence elements.

### Backend Setup (Go)

#### [NEW] backend/
- Initialize a Go module (`go mod init capsulehouse-backend`).
- Set up a basic `main.go` using an industry-standard web framework (e.g., Gin or Fiber) and `gorm` for PostgreSQL connectivity.
- Create a `Dockerfile` and `Dockerfile.dev` for the backend to run inside Docker Compose.

## Verification Plan

### Automated Tests
- Run `docker compose up --build` to ensure all containers start successfully.
- Ensure the frontend is accessible at `http://localhost:3000`.
- Ensure the Go backend API is accessible at `http://localhost:8080`.
- Ensure Postgres is running on `localhost:5432`.

### Manual Verification
- Test that any changes to frontend files reflect immediately via hot-reloading.
- Test that the backend connects to the Postgres database successfully upon startup.
