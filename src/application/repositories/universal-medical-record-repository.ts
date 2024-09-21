import { Consultation } from '@/domain/entities/consultation';
import { UniversalMedicalRecord } from '@/domain/entities/universal-medical-record';

export abstract class UniversalMedicalRecordRepository {
  abstract findById: (recordId: string) => Promise<UniversalMedicalRecord | null>;
  abstract findByPatientId: (patientId: string) => Promise<UniversalMedicalRecord | null>;
  abstract create: (record: UniversalMedicalRecord) => Promise<void | null>;
  abstract save: (record: UniversalMedicalRecord) => Promise<void | null>;
  abstract saveConsultationOnRecord: (consultation: Consultation) => Promise<void | null>;
  abstract removeConsultationOnRecord: (
    consultation: Consultation,
  ) => Promise<void | null>;
}
