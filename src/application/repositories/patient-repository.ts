import { MedicalRecord } from '@/domain/entities/medical-record';
import { Patient } from '@entities/patient';

export abstract class PatientRepository {
  abstract findBySlug: (slug: string) => Promise<Patient | null>;
  abstract findById: (id: string) => Promise<Patient | null>;
  abstract findMedicalRecordById: (
    medicalRecordId: string,
  ) => Promise<MedicalRecord | null>;

  abstract create: (patient: Patient) => Promise<void>;
  abstract save: (patient: Patient) => Promise<void>;
  abstract saveMedicalRecord: (medicalRecord: MedicalRecord) => Promise<void>;
  abstract delete: (consultation: Patient) => Promise<void>;
}
