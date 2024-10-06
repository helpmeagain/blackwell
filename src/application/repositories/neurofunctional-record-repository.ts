import { NeurofunctionalRecord } from '@/domain/entities/specific-records/neurofunctional-record';
import { PaginationParams } from '../common/pagination-params';

export abstract class NeurofunctionalRecordRepository {
  abstract findById: (id: string) => Promise<NeurofunctionalRecord | null>;
  abstract findByPatientId: (patientId: string) => Promise<NeurofunctionalRecord | null>;
  abstract findByUniversalRecordId: (
    universalRecordId: string,
  ) => Promise<NeurofunctionalRecord | null>;
  abstract findManyByClinicianId: (
    clinicianId: string,
    params: PaginationParams,
  ) => Promise<NeurofunctionalRecord[]>;
  abstract create: (neurofunctionalRecord: NeurofunctionalRecord) => Promise<void>;
  abstract save: (neurofunctionalRecord: NeurofunctionalRecord) => Promise<void>;
}
