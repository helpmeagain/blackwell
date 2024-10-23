import { NeurofunctionalRecordRepository } from '@/application/repositories/neurofunctional-record-repository';
import { AuthorizeAccessUseCase } from '@/application/use-cases/specific-records/manage-access/authorize-access/authorize-access';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NestAuthorizeAccessUseCase extends AuthorizeAccessUseCase {
  constructor(neuroRepository: NeurofunctionalRecordRepository) {
    super(neuroRepository);
  }
}
