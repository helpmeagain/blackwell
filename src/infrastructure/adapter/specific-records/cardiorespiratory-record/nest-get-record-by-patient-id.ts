import { CardiorespiratoryRecordRepository } from '@/application/repositories/cardiorespiratory-record-repository';
import { GetCardiorespiratoryByPatientIdUseCase } from '@/application/use-cases/specific-records/cardiorespiratory-record/get-record-by-patient-id/get-neurofunctional-record-by-patient-id';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NestGetCardiorespiratoryByPatientIdUseCase extends GetCardiorespiratoryByPatientIdUseCase {
  constructor(repository: CardiorespiratoryRecordRepository) {
    super(repository);
  }
}
