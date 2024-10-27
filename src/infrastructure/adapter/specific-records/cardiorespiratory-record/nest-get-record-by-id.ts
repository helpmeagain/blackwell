import { CardiorespiratoryRecordRepository } from '@/application/repositories/cardiorespiratory-record-repository';
import { GetCardiorespiratoryByIdUseCase } from '@/application/use-cases/specific-records/cardiorespiratory-record/get-record-by-id/get-record-by-id';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NestGetCardiorespiratoryByIdUseCase extends GetCardiorespiratoryByIdUseCase {
  constructor(repository: CardiorespiratoryRecordRepository) {
    super(repository);
  }
}
