import { NeurofunctionalRecord } from '@/domain/entities/specific-records/neurofunctional-record';

export abstract class NeurofunctionalRecordRepository {
  abstract findById: (id: string) => Promise<NeurofunctionalRecord | null>;
  abstract findByPatientId: (patientId: string) => Promise<NeurofunctionalRecord | null>;
  abstract findByUniversalRecordId: (
    universalRecordId: string,
  ) => Promise<NeurofunctionalRecord | null>;
  abstract create: (neurofunctionalRecord: NeurofunctionalRecord) => Promise<void>;
}
