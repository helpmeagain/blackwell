import { MedicalRecord } from '@/domain/entities/medical-record';
import { Patient } from '@entities/patient';

export interface PatientRepository {
  findBySlug: (slug: string) => Promise<Patient | null>;
  findById: (id: string) => Promise<Patient | null>;
  findMedicalRecordById: (medicalRecordId: string) => Promise<MedicalRecord | null>;
  create: (patient: Patient) => Promise<void>;
  save: (patient: Patient) => Promise<void>;
  saveMedicalRecord: (medicalRecord: MedicalRecord) => Promise<void>;
  delete: (consultation: Patient) => Promise<void>;
}
