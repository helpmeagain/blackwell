import { NeurofunctionalRecordRepository } from '@/application/repositories/neurofunctional-record-repository';
import { DenyPendingAuthorizationUseCase } from '@/application/use-cases/specific-records/manage-access/deny-pending-authorization/deny-pending-authorization';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NestDenyPendingAuthorizationUseCase extends DenyPendingAuthorizationUseCase {
  constructor(neuroRepository: NeurofunctionalRecordRepository) {
    super(neuroRepository);
  }
}
