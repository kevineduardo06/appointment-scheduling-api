import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { z } from 'zod';
import { appointmentService } from './modules/appointments/appointment.service.js';
import { availabilityService } from './modules/schedules/availability.service.js';
import { AppError } from './shared/errors.js';

export const app = express();
app.use(cors());
app.use(express.json());

const bookAppointmentSchema = z.object({
  patientName: z.string().min(1),
  doctorId: z.string().min(1),
  clinicId: z.string().min(1),
  startsAt: z.string().datetime(),
  endsAt: z.string().datetime()
});

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.get('/appointments', (_req, res) => {
  res.json(appointmentService.list());
});

app.post('/appointments', (req, res, next) => {
  try {
    const input = bookAppointmentSchema.parse(req.body);
    const appointment = appointmentService.book(input);
    res.status(201).json(appointment);
  } catch (error) {
    next(error);
  }
});

app.post('/appointments/:id/cancel', (req, res, next) => {
  try {
    const reason = z.object({ reason: z.string().min(1) }).parse(req.body).reason;
    res.json(appointmentService.cancel(req.params.id, reason));
  } catch (error) {
    next(error);
  }
});

app.get('/availability', (req, res, next) => {
  try {
    const query = z.object({
      day: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
      clinicId: z.string().optional(),
      specialty: z.string().optional()
    }).parse(req.query);

    res.json(availabilityService.findAvailableSlots(query));
  } catch (error) {
    next(error);
  }
});

app.use((error: unknown, _req: Request, res: Response, _next: NextFunction) => {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({ error: error.message });
    return;
  }

  if (error instanceof z.ZodError) {
    res.status(400).json({ error: 'Invalid request', details: error.issues });
    return;
  }

  res.status(500).json({ error: 'Internal server error' });
});
