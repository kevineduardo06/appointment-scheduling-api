import { randomUUID } from 'node:crypto';
import { appointmentRepository } from './appointment.repository.js';
import { Appointment } from './appointment.types.js';
import { clinicRepository } from '../clinics/clinic.repository.js';
import { doctorRepository } from '../doctors/doctor.repository.js';
import { scheduleRepository } from '../schedules/schedule.repository.js';
import { AppError } from '../../shared/errors.js';
import { overlaps, parseDate } from '../../shared/date.js';

export type BookAppointmentInput = {
  patientName: string;
  doctorId: string;
  clinicId: string;
  startsAt: string;
  endsAt: string;
};

export const appointmentService = {
  list() {
    return appointmentRepository.list();
  },

  book(input: BookAppointmentInput): Appointment {
    const doctor = doctorRepository.findById(input.doctorId);
    if (!doctor || !doctor.active) {
      throw new AppError(404, 'Doctor not found or inactive');
    }

    const clinic = clinicRepository.findById(input.clinicId);
    if (!clinic || !clinic.active) {
      throw new AppError(404, 'Clinic not found or inactive');
    }

    const startsAt = parseDate(input.startsAt);
    const endsAt = parseDate(input.endsAt);

    if (startsAt >= endsAt) {
      throw new AppError(400, 'Appointment start must be before end');
    }

    const matchingSlot = scheduleRepository
      .listByDoctor(input.doctorId)
      .find((slot) => slot.clinicId === input.clinicId && slot.startsAt <= startsAt && slot.endsAt >= endsAt);

    if (!matchingSlot) {
      throw new AppError(400, 'Requested time is outside doctor schedule');
    }

    const activeAppointments = appointmentRepository
      .list()
      .filter((appointment) => appointment.doctorId === input.doctorId && appointment.status === 'BOOKED');

    const hasConflict = activeAppointments.some((appointment) =>
      overlaps(startsAt, endsAt, appointment.startsAt, appointment.endsAt)
    );

    if (hasConflict) {
      throw new AppError(409, 'Doctor already has an appointment at this time');
    }

    return appointmentRepository.create({
      id: randomUUID(),
      patientName: input.patientName,
      doctorId: input.doctorId,
      clinicId: input.clinicId,
      startsAt,
      endsAt,
      status: 'BOOKED'
    });
  },

  cancel(id: string, reason: string): Appointment {
    const appointment = appointmentRepository.findById(id);
    if (!appointment) {
      throw new AppError(404, 'Appointment not found');
    }

    if (appointment.status !== 'BOOKED') {
      throw new AppError(400, 'Only booked appointments can be cancelled');
    }

    return appointmentRepository.update({
      ...appointment,
      status: 'CANCELLED',
      cancellationReason: reason,
      cancelledAt: new Date()
    }) as Appointment;
  }
};
