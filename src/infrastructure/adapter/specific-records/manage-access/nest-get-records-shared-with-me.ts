import { CardiorespiratoryRecordRepository } from '@/application/repositories/cardiorespiratory-record-repository';
import { NeurofunctionalRecordRepository } from '@/application/repositories/neurofunctional-record-repository';
import { PatientRepository } from '@/application/repositories/patient-repository';
import { TraumaOrthopedicRecordRepository } from '@/application/repositories/trauma-orthopedic-record-repository';
import { GetRecordsSharedWithMeUseCase } from '@/application/use-cases/specific-records/manage-access/get-records-shared-with-me/records-shared-with-me';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NestGetRecordsSharedWithMeUseCase extends GetRecordsSharedWithMeUseCase {
  constructor(
    neuroRepository: NeurofunctionalRecordRepository,
    traumaRepository: TraumaOrthopedicRecordRepository,
    cardioRepository: CardiorespiratoryRecordRepository,
    patientRepository: PatientRepository,
  ) {
    super(neuroRepository, cardioRepository, traumaRepository, patientRepository);
  }
}
