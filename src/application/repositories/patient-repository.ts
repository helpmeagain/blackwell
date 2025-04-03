import { Patient } from '@entities/patient';
import { PaginationParams } from '../common/pagination-params';

export abstract class PatientRepository {
  abstract findBySlug: (slug: string) => Promise<Patient[] | null>;
  abstract findByEmail: (email: string) => Promise<Patient | null>;
  abstract findByCpf: (email: string) => Promise<Patient | null>;
  abstract findById: (id: string) => Promise<Patient | null>;
  abstract findMany: (params: PaginationParams) => Promise<Patient[]>;
  abstract create: (patient: Patient) => Promise<void>;
  abstract save: (patient: Patient) => Promise<void>;
  abstract updatePassword: (id: string, password: string) => Promise<void>;
  abstract delete: (consultation: Patient) => Promise<void>;
}
