import { TraumaOrthopedicRecordRepository } from '@/application/repositories/trauma-orthopedic-record-repository';
import { GetTraumaOrthopedicByPatientIdUseCase } from '@/application/use-cases/specific-records/trauma-orthopedic-record/get-record-by-patient-id/get-record-by-patient-id';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NestGetTraumaOrthopedicByPatientIdUseCase extends GetTraumaOrthopedicByPatientIdUseCase {
  constructor(repository: TraumaOrthopedicRecordRepository) {
    super(repository);
  }
}
