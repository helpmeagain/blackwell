import { TraumaOrthopedicRecordRepository } from '@/application/repositories/trauma-orthopedic-record-repository';
import { PatientRepository } from '@/application/repositories/patient-repository';
import { FetchTraumaOrthopedicIdsByClinicianIdUseCase } from '@/application/use-cases/specific-records/trauma-orthopedic-record/fetch-records-ids-by-clinician-id/fetch-records-by-clinician-id';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NestFetchTraumaOrthopedicIdsByClinicianIdUseCase extends FetchTraumaOrthopedicIdsByClinicianIdUseCase {
  constructor(
    traumaorthopedicRecordRepository: TraumaOrthopedicRecordRepository,
    patientRepository: PatientRepository,
  ) {
    super(traumaorthopedicRecordRepository, patientRepository);
  }
}
