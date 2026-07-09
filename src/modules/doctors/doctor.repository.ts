import { Doctor } from './doctor.types.js';

const doctors: Doctor[] = [
  { id: 'doc-1', name: 'Ana Ribeiro', specialty: 'Cardiology', active: true },
  { id: 'doc-2', name: 'Bruno Martins', specialty: 'Dermatology', active: true },
  { id: 'doc-3', name: 'Carla Lima', specialty: 'Cardiology', active: false }
];

export const doctorRepository = {
  list() {
    return [...doctors];
  },
  findById(id: string) {
    return doctors.find((doctor) => doctor.id === id);
  }
};
