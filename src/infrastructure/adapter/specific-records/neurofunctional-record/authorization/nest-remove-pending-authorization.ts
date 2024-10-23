import { NeurofunctionalRecordRepository } from '@/application/repositories/neurofunctional-record-repository';
import { RemovePendingAuthorizationUseCase } from '@/application/use-cases/specific-records/neurofunctional-record/authorization/remove-pending-authorization/remove-pending-authorization';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NestRemovePendingAuthorizationUseCase extends RemovePendingAuthorizationUseCase {
  constructor(recordRepository: NeurofunctionalRecordRepository) {
    super(recordRepository);
  }
}
