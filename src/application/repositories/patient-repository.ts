import { Consultation } from '@/domain/entities/consultation';
import { MedicalRecord } from '@/domain/entities/medical-record';
import { Patient } from '@entities/patient';
import { PaginationParams } from '../common/pagination-params';

export abstract class PatientRepository {
  abstract findBySlug: (slug: string) => Promise<Patient | null>;
  abstract findByEmail: (email: string) => Promise<Patient | null>;
  abstract findById: (id: string) => Promise<Patient | null>;
  abstract findMany: (params: PaginationParams) => Promise<Patient[]>;
  abstract create: (patient: Patient) => Promise<void>;
  abstract save: (patient: Patient) => Promise<void>;
  abstract delete: (consultation: Patient) => Promise<void>;

  abstract findRecordById: (recordId: string) => Promise<MedicalRecord | null>;
  abstract findRecordByPatientId: (patientId: string) => Promise<MedicalRecord | null>;
  abstract createRecord: (
    patientId: string,
    record: MedicalRecord,
  ) => Promise<void | null>;

  abstract saveRecord: (record: MedicalRecord) => Promise<void | null>;
  abstract saveConsultationOnRecord: (consultation: Consultation) => Promise<void | null>;
  abstract removeConsultationOnRecord: (
    consultation: Consultation,
  ) => Promise<void | null>;
}
