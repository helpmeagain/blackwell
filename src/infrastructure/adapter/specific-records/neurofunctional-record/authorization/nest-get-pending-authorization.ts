import { NeurofunctionalRecordRepository } from '@/application/repositories/neurofunctional-record-repository';
import { GetPendingAuthorizationUsersUseCase } from '@/application/use-cases/specific-records/neurofunctional-record/authorization/get-pending-authorization/get-pending-authorization';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NestGetPendingAuthorizationUsersUseCase extends GetPendingAuthorizationUsersUseCase {
  constructor(recordRepository: NeurofunctionalRecordRepository) {
    super(recordRepository);
  }
}
