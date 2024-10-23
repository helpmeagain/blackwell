import { NeurofunctionalRecordRepository } from '@/application/repositories/neurofunctional-record-repository';
import { RemoveAccessUseCase } from '@/application/use-cases/specific-records/neurofunctional-record/authorization/remove-access/remove-access';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NestRemoveAccessUseCase extends RemoveAccessUseCase {
  constructor(recordRepository: NeurofunctionalRecordRepository) {
    super(recordRepository);
  }
}
