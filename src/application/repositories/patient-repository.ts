import { Patient } from '@entities/patient';

export interface PatientRepository {
  create: (patient: Patient) => Promise<void>;
}
