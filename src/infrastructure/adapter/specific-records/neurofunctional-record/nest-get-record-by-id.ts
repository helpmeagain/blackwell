import { NeurofunctionalRecordRepository } from '@/application/repositories/neurofunctional-record-repository';
import { GetNeurofunctionalByIdUseCase } from '@/application/use-cases/specific-records/neurofunctional-record/get-record-by-id/get-neurofunctional-record-by-id';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NestGetNeurofunctionalByIdUseCase extends GetNeurofunctionalByIdUseCase {
  constructor(repository: NeurofunctionalRecordRepository) {
    super(repository);
  }
}
