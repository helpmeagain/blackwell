import { Clinician } from '@entities/clinician';

export abstract class ClinicianRepository {
  abstract findById: (id: string) => Promise<Clinician | null>;
  abstract findBySlug: (id: string) => Promise<Clinician | null>;
  abstract create: (clinician: Clinician) => Promise<void>;
  abstract save: (clinician: Clinician) => Promise<void>;
  abstract delete: (consultation: Clinician) => Promise<void>;
}
