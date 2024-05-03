import { Clinician } from '@entities/clinician';

export interface ClinicianRepository {
  findById: (id: string) => Promise<Clinician | null>;
  findBySlug: (id: string) => Promise<Clinician | null>;
  create: (clinician: Clinician) => Promise<void>;
  save: (clinician: Clinician) => Promise<void>;
  delete: (consultation: Clinician) => Promise<void>;
}
