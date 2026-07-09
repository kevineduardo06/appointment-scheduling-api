# Appointment Scheduling API

Small TypeScript/Express API for managing doctor schedules, appointment bookings, cancellations, and availability checks.

This repository is intentionally lightweight but structured like a real service so it can be used for senior-engineering workflow tasks.

## Domain

The API supports:

- Doctors and clinics
- Schedule slots
- Appointment booking
- Cancellation history
- Availability search by clinic and specialty
- Conflict prevention for overlapping appointments

## Commands

```bash
npm install
npm test
npm run build
npm run dev
```

## Architecture

- `controllers` handle HTTP only.
- `services` contain business rules.
- `repositories` contain persistence access.
- `shared` contains common error and date utilities.

## Useful task ideas

- Cancelled appointments should release their schedule slot, but only after cancellation is persisted.
- Availability search currently treats dates using local time helpers and may behave incorrectly around timezone boundaries.
- Booking conflict logic should prevent overlapping appointments for the same doctor.
- Add support for filtering availability by specialty and clinic together.
- Refactor duplicated date range logic out of appointment and availability services.
