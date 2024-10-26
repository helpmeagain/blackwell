import { CardiorespiratoryRecordRepository } from '@/application/repositories/cardiorespiratory-record-repository';
import { EditCardiorespiratoryByIdUseCase } from '@/application/use-cases/specific-records/cardiorespiratory-record/edit-record-by-id/edit-record-by-id';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NestEditCardiorespiratoryByIdUseCase extends EditCardiorespiratoryByIdUseCase {
  constructor(repository: CardiorespiratoryRecordRepository) {
    super(repository);
  }
}
