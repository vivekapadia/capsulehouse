# Public Local Hosting Implementation Plan

You've successfully tested the application locally, but to allow anyone in another country to view it from your machine, we need to prepare the application for "Public Local Hosting."

Following Phase 2 & 3 of your Feature Specification Document, the best approach is to Dockerize your entire stack (Frontend, Backend, and Database) so they run reliably as a single unit. Once Dockerized, we can expose the frontend to the internet.

## User Review Required

> [!IMPORTANT]  
> Before proceeding, we need to decide how you want to expose your local machine to the internet.
> 
> **Option 1 (Recommended & Easiest): Cloudflare Tunnel or Ngrok**
> - Creates a secure tunnel directly to your Docker container without changing router settings or dealing with firewalls.
> - Perfect for quick, secure sharing across countries.
> 
> **Option 2 (FSD Approach): Manual Port Forwarding**
> - You will need to log into your Wi-Fi Router, set a static IP, and forward Port 80 to your computer.
> - We will include an Nginx reverse proxy container to handle the routing.
>
> Please let me know which option you prefer. If you are unsure, I highly recommend Option 1 (using Ngrok or Cloudflared) for a smooth experience.

## Proposed Changes

Regardless of the exposure method, we first must containerize the Go Backend and Next.js Frontend.

### Backend

#### [NEW] backend/Dockerfile
- Multi-stage build to compile the Go binary and run it in a lightweight Alpine container.
- Update database connection strings to use the Docker network instead of `localhost`.

### Frontend

#### [NEW] frontend/Dockerfile
- Multi-stage build for the Next.js app utilizing Next.js `standalone` output for minimal image size.
- Ensure environment variables point to the Dockerized backend API.

#### [MODIFY] frontend/next.config.ts
- Enable `output: 'standalone'` to support efficient Docker builds.

### Project Root

#### [MODIFY] docker-compose.yml
- Add the `backend` service (builds from `backend/Dockerfile`).
- Add the `frontend` service (builds from `frontend/Dockerfile`).
- If you choose **Option 2**, we will also add an `nginx` service here.
- If you choose **Option 1**, we can optionally add a `cloudflared` or `ngrok` container.

## Verification Plan

1. **Docker Build:** Run `docker compose build` to ensure both Go and Next.js compile successfully inside their containers.
2. **Docker Up:** Run `docker compose up -d` to spin up the entire cluster.
3. **Internal Test:** Access `http://localhost:3000` to verify the dockerized app connects perfectly to the dockerized backend and database.
4. **Public Test:** Depending on the exposure option chosen, generate the public URL (via Tunnel or Public IP) and verify it loads successfully on an external device (like your phone on cellular data).




# Task List: Public Local Hosting (Cloudflare Tunnel)

- [x] Dockerize Backend
  - [x] Create `backend/Dockerfile`
  - [x] Ensure `main.go` environment variables are ready for Docker
- [x] Dockerize Frontend
  - [x] Create `frontend/Dockerfile`
  - [x] Update `next.config.ts` for `standalone` output
- [x] Update Orchestration
  - [x] Update `docker-compose.yml` with `backend`, `frontend`, and `cloudflared` services
- [x] Verification
  - [x] Run `docker compose build`
  - [x] Run `docker compose up -d`
  - [x] Fetch the public URL from the `cloudflared` logs

