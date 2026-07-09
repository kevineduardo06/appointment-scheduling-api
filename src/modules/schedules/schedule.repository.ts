import { ScheduleSlot } from './schedule.types.js';

const scheduleSlots: ScheduleSlot[] = [
  { id: 'slot-1', doctorId: 'doc-1', clinicId: 'clinic-1', startsAt: new Date('2026-05-04T12:00:00.000Z'), endsAt: new Date('2026-05-04T12:30:00.000Z') },
  { id: 'slot-2', doctorId: 'doc-1', clinicId: 'clinic-1', startsAt: new Date('2026-05-04T12:30:00.000Z'), endsAt: new Date('2026-05-04T13:00:00.000Z') },
  { id: 'slot-3', doctorId: 'doc-2', clinicId: 'clinic-2', startsAt: new Date('2026-05-04T14:00:00.000Z'), endsAt: new Date('2026-05-04T14:30:00.000Z') }
];

export const scheduleRepository = {
  list() {
    return [...scheduleSlots];
  },
  findById(id: string) {
    return scheduleSlots.find((slot) => slot.id === id);
  },
  listByDoctor(doctorId: string) {
    return scheduleSlots.filter((slot) => slot.doctorId === doctorId);
  }
};
