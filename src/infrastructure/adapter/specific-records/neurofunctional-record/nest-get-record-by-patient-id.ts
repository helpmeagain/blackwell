import { NeurofunctionalRecordRepository } from '@/application/repositories/neurofunctional-record-repository';
import { GetNeurofunctionalByPatientIdUseCase } from '@/application/use-cases/specific-records/neurofunctional-record/get-record-by-patient-id/get-neurofunctional-record-by-patient-id';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NestGetNeurofunctionalByPatientIdUseCase extends GetNeurofunctionalByPatientIdUseCase {
  constructor(repository: NeurofunctionalRecordRepository) {
    super(repository);
  }
}
