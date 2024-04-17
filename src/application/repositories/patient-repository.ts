import { Patient } from '@entities/patient';

export interface PatientRepository {
  findBySlug: (slug: string) => Promise<Patient | null>;
  findById: (id: string) => Promise<Patient | null>;
  create: (patient: Patient) => Promise<void>;
  delete: (consultation: Patient) => Promise<void>;
}
