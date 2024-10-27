import { CardiorespiratoryRecordRepository } from '@/application/repositories/cardiorespiratory-record-repository';
import { PatientRepository } from '@/application/repositories/patient-repository';
import { FetchCardiorespiratoryIdsByClinicianIdUseCase } from '@/application/use-cases/specific-records/cardiorespiratory-record/fetch-records-ids-by-clinician-id/fetch-records-by-clinician-id';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NestFetchCardiorespiratoryIdsByClinicianIdUseCase extends FetchCardiorespiratoryIdsByClinicianIdUseCase {
  constructor(
    cardiorespiratoryRecordRepository: CardiorespiratoryRecordRepository,
    patientRepository: PatientRepository,
  ) {
    super(cardiorespiratoryRecordRepository, patientRepository);
  }
}
