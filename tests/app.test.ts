import request from 'supertest';
import { beforeEach, describe, expect, it } from 'vitest';
import { app } from '../src/app.js';
import { appointmentRepository } from '../src/modules/appointments/appointment.repository.js';

beforeEach(() => {
  appointmentRepository.clear();
});

describe('HTTP API', () => {
  it('returns health status', async () => {
    const response = await request(app).get('/health');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'ok' });
  });

  it('books an appointment through the API', async () => {
    const response = await request(app)
      .post('/appointments')
      .send({
        patientName: 'API Patient',
        doctorId: 'doc-1',
        clinicId: 'clinic-1',
        startsAt: '2026-05-04T12:00:00.000Z',
        endsAt: '2026-05-04T12:30:00.000Z'
      });

    expect(response.status).toBe(201);
    expect(response.body.status).toBe('BOOKED');
  });

  it('returns available slots through the API', async () => {
    const response = await request(app).get('/availability?day=2026-05-04&clinicId=clinic-1');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
  });
});
