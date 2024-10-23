import { NeurofunctionalRecordRepository } from '@/application/repositories/neurofunctional-record-repository';
import { RevokeAccessUseCase } from '@/application/use-cases/specific-records/manage-access/revoke-access/revoke-access';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NestRevokeAccessUseCase extends RevokeAccessUseCase {
  constructor(neuroRepository: NeurofunctionalRecordRepository) {
    super(neuroRepository);
  }
}
