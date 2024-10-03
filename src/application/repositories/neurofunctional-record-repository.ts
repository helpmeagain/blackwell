import { NeurofunctionalRecord } from '@/domain/entities/specific-records/neurofunctional-record';

export abstract class NeurofunctionalRecordRepository {
  abstract create: (neurofunctionalRecord: NeurofunctionalRecord) => Promise<void>;
}
