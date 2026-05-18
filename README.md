# GrindLog

LeetCode streak tracker — log problems, track your calendar, and keep your grind going.

## Stack

- **Client:** React + Vite (`client/GrindLog`)
- **API:** Express (`backend`)

## Run locally

```bash
# Terminal 1 — API
cd backend && npm install && npm run dev

# Terminal 2 — UI
cd client/GrindLog && npm install && npm run dev
```

Open the Vite URL (usually http://localhost:5173). The UI proxies `/api` to port 3001.

## Build roadmap (suggested commits)

| Phase | What | Suggested commit message |
|-------|------|--------------------------|
| **1** ✅ | Express health check + dashboard layout + entry form shell | `Scaffold API and dashboard layout` |
| **2** | Persist entries (JSON file or Neon Postgres) + CRUD routes | `Add entries API and wire client to backend` |
| **3** | LeetCode title lookup by problem number | `Lookup problem title from LeetCode number` |
| **4** | Streak calculation from solve dates | `Compute daily streak from solve history` |
| **5** | Polish: validation, empty states, tests | `Improve UX and add tests` |

## Phase 1 (current)

- Two-column dashboard matching the wireframe: saved list + week calendar + streak
- Entry form with all fields (saves to in-memory state until Phase 2)
- `GET /api/health` to verify the API is running
