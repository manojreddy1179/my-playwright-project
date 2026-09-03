# TradeLens

TradeLens is a locally deployable NSE/BSE trading assistant monorepo for paper trading and future live-broker integration.

## Architecture

- apps/web: React + TypeScript + Vite dashboard
- apps/api: Fastify backend with REST + WebSocket APIs
- apps/data-service: Python FastAPI service for data and indicator workflows
- packages/shared-types: shared TypeScript contracts

## Quick start

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the PostgreSQL container:
   ```bash
   npm run docker:up
   ```
3. Start the Python data service:
   ```bash
   npm run dev:data
   ```
4. Start the API server:
   ```bash
   npm run dev:api
   ```
5. Start the frontend:
   ```bash
   npm run dev:web
   ```

The app is intentionally paper-first and clearly identifies the delayed/demo feed in the UI.

## Environment variables

Copy `.env.example` to `.env` and fill in any keys required for broker or news integrations.

## Phase 1 status

This scaffold includes:

- monorepo structure
- backend health route
- frontend dashboard shell
- Python health route
- Dockerized Postgres
- shared type package

The next steps are historical data stitching, technical analysis, and the paper trading engine.
