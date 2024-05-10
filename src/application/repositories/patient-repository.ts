import { MedicalRecord } from '@/domain/entities/medical-record';
import { Patient } from '@entities/patient';

export abstract class PatientRepository {
  abstract findBySlug: (slug: string) => Promise<Patient | null>;
  abstract findByEmail: (email: string) => Promise<Patient | null>;
  abstract findById: (id: string) => Promise<Patient | null>;
  abstract create: (patient: Patient) => Promise<void>;
  abstract save: (patient: Patient) => Promise<void>;
  abstract delete: (consultation: Patient) => Promise<void>;

  abstract findRecordById: (recordId: string) => Promise<MedicalRecord | null>;
  abstract createRecord: (
    patientId: string,
    record: MedicalRecord,
  ) => Promise<void | null>;

  abstract saveRecord: (record: MedicalRecord) => Promise<void>;
}
