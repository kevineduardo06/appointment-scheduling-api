import { beforeEach, describe, expect, it } from 'vitest';
import { appointmentRepository } from '../src/modules/appointments/appointment.repository.js';
import { appointmentService } from '../src/modules/appointments/appointment.service.js';
import { availabilityService } from '../src/modules/schedules/availability.service.js';

beforeEach(() => {
  appointmentRepository.clear();
});

describe('appointmentService', () => {
  it('books an appointment inside an available schedule slot', () => {
    const appointment = appointmentService.book({
      patientName: 'Kevin Toledo',
      doctorId: 'doc-1',
      clinicId: 'clinic-1',
      startsAt: '2026-05-04T12:00:00.000Z',
      endsAt: '2026-05-04T12:30:00.000Z'
    });

    expect(appointment.status).toBe('BOOKED');
    expect(appointment.doctorId).toBe('doc-1');
  });

  it('rejects appointments outside the doctor schedule', () => {
    expect(() => appointmentService.book({
      patientName: 'Kevin Toledo',
      doctorId: 'doc-1',
      clinicId: 'clinic-1',
      startsAt: '2026-05-04T18:00:00.000Z',
      endsAt: '2026-05-04T18:30:00.000Z'
    })).toThrow('Requested time is outside doctor schedule');
  });

  it('rejects overlapping active appointments for the same doctor', () => {
    appointmentService.book({
      patientName: 'First Patient',
      doctorId: 'doc-1',
      clinicId: 'clinic-1',
      startsAt: '2026-05-04T12:00:00.000Z',
      endsAt: '2026-05-04T12:30:00.000Z'
    });

    expect(() => appointmentService.book({
      patientName: 'Second Patient',
      doctorId: 'doc-1',
      clinicId: 'clinic-1',
      startsAt: '2026-05-04T12:15:00.000Z',
      endsAt: '2026-05-04T12:30:00.000Z'
    })).toThrow('Doctor already has an appointment at this time');
  });

  it('allows booking a slot after the previous appointment is cancelled', () => {
    const appointment = appointmentService.book({
      patientName: 'First Patient',
      doctorId: 'doc-1',
      clinicId: 'clinic-1',
      startsAt: '2026-05-04T12:00:00.000Z',
      endsAt: '2026-05-04T12:30:00.000Z'
    });

    appointmentService.cancel(appointment.id, 'Patient requested cancellation');

    const replacement = appointmentService.book({
      patientName: 'Replacement Patient',
      doctorId: 'doc-1',
      clinicId: 'clinic-1',
      startsAt: '2026-05-04T12:00:00.000Z',
      endsAt: '2026-05-04T12:30:00.000Z'
    });

    expect(replacement.status).toBe('BOOKED');
  });

  it('rejects inactive doctors', () => {
    expect(() => appointmentService.book({
      patientName: 'Patient',
      doctorId: 'doc-3',
      clinicId: 'clinic-1',
      startsAt: '2026-05-04T12:00:00.000Z',
      endsAt: '2026-05-04T12:30:00.000Z'
    })).toThrow('Doctor not found or inactive');
  });
});

describe('availabilityService', () => {
  it('returns available slots for a day', () => {
    const slots = availabilityService.findAvailableSlots({ day: '2026-05-04' });

    expect(slots).toHaveLength(3);
  });

  it('does not return a slot blocked by a booked appointment', () => {
    appointmentService.book({
      patientName: 'First Patient',
      doctorId: 'doc-1',
      clinicId: 'clinic-1',
      startsAt: '2026-05-04T12:00:00.000Z',
      endsAt: '2026-05-04T12:30:00.000Z'
    });

    const slots = availabilityService.findAvailableSlots({ day: '2026-05-04' });

    expect(slots.map((slot) => slot.id)).not.toContain('slot-1');
    expect(slots.map((slot) => slot.id)).toContain('slot-2');
  });

  it('filters available slots by clinic and specialty', () => {
    const slots = availabilityService.findAvailableSlots({
      day: '2026-05-04',
      clinicId: 'clinic-1',
      specialty: 'Cardiology'
    });

    expect(slots.map((slot) => slot.id)).toEqual(['slot-1', 'slot-2']);
  });
});
