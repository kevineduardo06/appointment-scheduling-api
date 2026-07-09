import { appointmentRepository } from '../appointments/appointment.repository.js';
import { doctorRepository } from '../doctors/doctor.repository.js';
import { scheduleRepository } from './schedule.repository.js';
import { isSameCalendarDay, overlaps } from '../../shared/date.js';

export type AvailabilityFilter = {
  day: string;
  clinicId?: string;
  specialty?: string;
};

export const availabilityService = {
  findAvailableSlots(filter: AvailabilityFilter) {
    const activeAppointments = appointmentRepository
      .list()
      .filter((appointment) => appointment.status === 'BOOKED');

    return scheduleRepository
      .list()
      .filter((slot) => isSameCalendarDay(slot.startsAt, filter.day))
      .filter((slot) => !filter.clinicId || slot.clinicId === filter.clinicId)
      .filter((slot) => {
        if (!filter.specialty) return true;
        const doctor = doctorRepository.findById(slot.doctorId);
        return doctor?.active && doctor.specialty === filter.specialty;
      })
      .filter((slot) => {
        const blockingAppointment = activeAppointments.find((appointment) =>
          appointment.doctorId === slot.doctorId && overlaps(slot.startsAt, slot.endsAt, appointment.startsAt, appointment.endsAt)
        );
        return !blockingAppointment;
      });
  }
};
