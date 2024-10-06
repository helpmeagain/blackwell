import { NeurofunctionalRecordRepository } from '@/application/repositories/neurofunctional-record-repository';
import { EditNeurofunctionalByIdUseCase } from '@/application/use-cases/specific-records/neurofunctional-record/edit-record-by-id/edit-neurofunctional-record-by-id';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NestEditNeurofunctionalByIdUseCase extends EditNeurofunctionalByIdUseCase {
  constructor(repository: NeurofunctionalRecordRepository) {
    super(repository);
  }
}
