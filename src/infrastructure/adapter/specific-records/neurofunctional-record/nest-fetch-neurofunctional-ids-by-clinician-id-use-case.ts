import { NeurofunctionalRecordRepository } from '@/application/repositories/neurofunctional-record-repository';
import { PatientRepository } from '@/application/repositories/patient-repository';
import { FetchNeurofunctionalIdsByClinicianIdUseCase } from '@/application/use-cases/specific-records/neurofunctional-record/fetch-records-ids-by-clinician-id/fetch-records-by-clinician-id';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NestFetchNeurofunctionalIdsByClinicianIdUseCase extends FetchNeurofunctionalIdsByClinicianIdUseCase {
  constructor(
    neurofunctionalRecordRepository: NeurofunctionalRecordRepository,
    patientRepository: PatientRepository,
  ) {
    super(neurofunctionalRecordRepository, patientRepository);
  }
}
