# CLAUDE.md

## Commands

- Install dependencies: `npm install`
- Run tests: `npm test`
- Type-check/build: `npm run build`
- Lint: `npm run lint`

## Workflow Rules

- Do not push changes unless explicitly asked.
- Do not use `--no-verify`.
- Do not run destructive git commands such as `git reset --hard`, `git clean -fd`, deleting branches, or force pushing without confirmation.
- Keep diffs focused on the requested task.
- Add or update tests for behavior changes.
- Before finishing, report the exact commands you ran and their results.

## Architecture Rules

- Controllers should only parse HTTP input and return HTTP responses.
- Business rules belong in services.
- Repositories should stay simple and persistence-focused.
- Prefer existing project patterns before introducing new abstractions.
- Avoid adding dependencies unless there is a clear reason.

## Domain Notes

- Cancelled appointments should not block new bookings.
- A doctor cannot have overlapping active appointments.
- Schedule slots belong to one doctor and one clinic.
- Availability should be calculated from schedule slots minus active appointments.
