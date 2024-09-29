import { Clinician } from '@entities/clinician';
import { PaginationParams } from '../common/pagination-params';

export abstract class ClinicianRepository {
  abstract findById: (id: string) => Promise<Clinician | null>;
  abstract findByEmail: (id: string) => Promise<Clinician | null>;
  abstract findBySlug: (id: string) => Promise<Clinician[] | null>;
  abstract findMany: (params: PaginationParams) => Promise<Clinician[]>;
  abstract create: (clinician: Clinician) => Promise<void>;
  abstract save: (clinician: Clinician) => Promise<void>;
  abstract delete: (consultation: Clinician) => Promise<void>;
}
