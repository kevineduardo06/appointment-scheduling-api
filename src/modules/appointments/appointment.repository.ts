import { Appointment } from './appointment.types.js';

const appointments: Appointment[] = [];

export const appointmentRepository = {
  list() {
    return [...appointments];
  },
  findById(id: string) {
    return appointments.find((appointment) => appointment.id === id);
  },
  create(appointment: Appointment) {
    appointments.push(appointment);
    return appointment;
  },
  update(updated: Appointment) {
    const index = appointments.findIndex((appointment) => appointment.id === updated.id);
    if (index === -1) return undefined;
    appointments[index] = updated;
    return updated;
  },
  clear() {
    appointments.splice(0, appointments.length);
  }
};
