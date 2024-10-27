import { TraumaOrthopedicRecordRepository } from '@/application/repositories/trauma-orthopedic-record-repository';
import { EditTraumaOrthopedicByIdUseCase } from '@/application/use-cases/specific-records/trauma-orthopedic-record/edit-record-by-id/edit-record-by-id';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NestEditTraumaOrthopedicByIdUseCase extends EditTraumaOrthopedicByIdUseCase {
  constructor(repository: TraumaOrthopedicRecordRepository) {
    super(repository);
  }
}
