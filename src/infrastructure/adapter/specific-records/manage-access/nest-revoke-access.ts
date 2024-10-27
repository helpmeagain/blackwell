import { CardiorespiratoryRecordRepository } from '@/application/repositories/cardiorespiratory-record-repository';
import { NeurofunctionalRecordRepository } from '@/application/repositories/neurofunctional-record-repository';
import { TraumaOrthopedicRecordRepository } from '@/application/repositories/trauma-orthopedic-record-repository';
import { RevokeAccessUseCase } from '@/application/use-cases/specific-records/manage-access/revoke-access/revoke-access';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NestRevokeAccessUseCase extends RevokeAccessUseCase {
  constructor(neuroRepository: NeurofunctionalRecordRepository, 
    cardioRepository: CardiorespiratoryRecordRepository, 
    traumaRepository: TraumaOrthopedicRecordRepository
  ) {
    super(neuroRepository, cardioRepository, traumaRepository);
  }
}
