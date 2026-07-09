export type AppointmentStatus = 'BOOKED' | 'CANCELLED' | 'COMPLETED';

export type Appointment = {
  id: string;
  patientName: string;
  doctorId: string;
  clinicId: string;
  startsAt: Date;
  endsAt: Date;
  status: AppointmentStatus;
  cancellationReason?: string;
  cancelledAt?: Date;
};
