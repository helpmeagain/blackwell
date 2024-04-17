import { Patient } from '@entities/patient';

export interface PatientRepository {
  findById: (id: string) => Promise<Patient | null>;
  create: (patient: Patient) => Promise<void>;
  delete: (consultation: Patient) => Promise<void>;
}
