import { NeurofunctionalRecordRepository } from '@/application/repositories/neurofunctional-record-repository';
import { createNeurofunctionalRecord } from '@/application/use-cases/specific-records/neurofunctional-record/create-record/create-neurofunctional-record';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NestCreateNeurofunctionalRecordUseCase extends createNeurofunctionalRecord {
  constructor(repository: NeurofunctionalRecordRepository) {
    super(repository);
  }
}
