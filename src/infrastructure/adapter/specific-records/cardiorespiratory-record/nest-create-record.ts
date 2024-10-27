import { ClinicianRepository } from '@/application/repositories/clinician-repository';
import { CardiorespiratoryRecordRepository } from '@/application/repositories/cardiorespiratory-record-repository';
import { PatientRepository } from '@/application/repositories/patient-repository';
import { createCardiorespiratoryRecord } from '@/application/use-cases/specific-records/cardiorespiratory-record/create-record/create-record';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NestCreateCardiorespiratoryRecordUseCase extends createCardiorespiratoryRecord {
  constructor(
    cardiorespiratoryRecordRepository: CardiorespiratoryRecordRepository,
    patientRepository: PatientRepository,
    clinicianRepository: ClinicianRepository,
  ) {
    super(cardiorespiratoryRecordRepository, patientRepository, clinicianRepository);
  }
}
