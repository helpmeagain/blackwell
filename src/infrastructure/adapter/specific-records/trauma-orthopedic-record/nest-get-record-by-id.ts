import { TraumaOrthopedicRecordRepository } from '@/application/repositories/trauma-orthopedic-record-repository';
import { GetTraumaOrthopedicByIdUseCase } from '@/application/use-cases/specific-records/trauma-orthopedic-record/get-record-by-id/get-record-by-id';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NestGetTraumaOrthopedicByIdUseCase extends GetTraumaOrthopedicByIdUseCase {
  constructor(repository: TraumaOrthopedicRecordRepository) {
    super(repository);
  }
}
