# Appointment Scheduling API

A personal TypeScript/Express REST API prototype for managing clinic and doctor schedules, booking appointments, cancelling bookings, and querying availability. The project is intended for continued development and experimentation with backend engineering workflows.

## Current features

- In-memory clinic, doctor, schedule-slot and appointment repositories
- Appointment booking with active doctor/clinic checks and time-range validation
- Overlap checks against existing booked appointments
- Cancellation with reason and timestamp
- Availability lookup by date, optional clinic and optional specialty
- HTTP request validation with Zod and tests with Vitest/Supertest

**Current limitations:** Data is stored in memory and is not durable across process restarts. The API has no authentication, and is not suitable for real patient information or production clinical use. Availability currently returns whole schedule slots and excludes a slot when it overlaps an appointment; it does not calculate remaining sub-slot intervals. Date/time handling and concurrent booking guarantees need improvement.

## Tech stack

Node.js, TypeScript, Express, Zod, Vitest, Supertest and TSX.

## Run locally

```bash
npm ci
npm run dev
```

The development server is started by `src/server.ts`. Available scripts:

```bash
npm test
npm run build
npm run lint
```

## API routes

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/health` | Health status |
| GET | `/appointments` | List appointments |
| POST | `/appointments` | Book an appointment |
| POST | `/appointments/:id/cancel` | Cancel an appointment |
| GET | `/availability?day=YYYY-MM-DD` | Query available schedule slots; optional `clinicId` and `specialty` |

Example booking payload (development-only fictional data):

```json
{
  "patientName": "Sample Patient",
  "doctorId": "doc-1",
  "clinicId": "clinic-1",
  "startsAt": "2026-05-04T12:00:00.000Z",
  "endsAt": "2026-05-04T12:30:00.000Z"
}
```

## Architecture

- `src/app.ts`: HTTP routes and request validation
- `src/modules/appointments`: booking and cancellation logic
- `src/modules/schedules`: schedule repositories and availability lookup
- `src/modules/doctors`, `src/modules/clinics`: reference data
- `src/shared`: shared errors and date utilities
- `tests`: unit and HTTP tests

## Development plans

See [ROADMAP.md](ROADMAP.md) for proposed enhancements and effort estimates. These are planned features, not claims about current implementation.

## Data and license

Use only fictional development data. Do not enter real patient records or other personal information. Released under the [MIT License](LICENSE).
