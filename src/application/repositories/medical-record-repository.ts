import { MedicalRecord } from '@entities/medical-record';

export interface MedicalRecordRepository {
  findById: (id: string) => Promise<MedicalRecord | null>;
  create: (medicalRecord: MedicalRecord) => Promise<void>;
  save: (medicalRecord: MedicalRecord) => Promise<void>;
  delete: (medicalRecord: MedicalRecord) => Promise<void>;
}
