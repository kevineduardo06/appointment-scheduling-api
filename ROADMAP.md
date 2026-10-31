# Development roadmap

The following is a proposed backlog for continued personal development. Estimates are rough planning ranges, not recorded hours or completed work.

| Priority | Proposed improvement | Estimated effort |
| --- | --- | --- |
| High | Correct timezone and calendar-day behavior, including DST boundary tests | 5–8 h |
| High | Return genuinely available sub-intervals instead of hiding entire partially booked slots | 5–8 h |
| High | Add persistent storage and migrations (e.g. PostgreSQL) | 7–12 h |
| High | Enforce concurrency-safe bookings and transactional conflict checks | 5–9 h |
| Medium | Support recurring schedules, holidays and schedule exceptions | 5–8 h |
| Medium | Add authentication and role-based access for development/demo users | 5–8 h |
| Medium | Add rescheduling workflows and cancellation policies | 4–7 h |
| Medium | Improve API documentation, validation and integration tests | 4–7 h |

**Total proposed effort: 40–67 hours.**

## Suggested milestones

1. **Correctness:** time handling, slot calculation and regression tests.
2. **Durability:** database persistence and transactional bookings.
3. **Features:** recurring schedules, rescheduling and policies.
4. **Hardening:** authentication, documentation and integration tests.

These are possible next steps, to be prioritized based on actual development needs. This prototype is not intended to process real patient data.
