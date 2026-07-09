import { Clinic } from './clinic.types.js';

const clinics: Clinic[] = [
  { id: 'clinic-1', name: 'Central Clinic', city: 'Goiânia', active: true },
  { id: 'clinic-2', name: 'North Clinic', city: 'Anápolis', active: true }
];

export const clinicRepository = {
  list() {
    return [...clinics];
  },
  findById(id: string) {
    return clinics.find((clinic) => clinic.id === id);
  }
};
