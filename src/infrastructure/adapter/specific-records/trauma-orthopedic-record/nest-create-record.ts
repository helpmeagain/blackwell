import { ClinicianRepository } from '@/application/repositories/clinician-repository';
import { TraumaOrthopedicRecordRepository } from '@/application/repositories/trauma-orthopedic-record-repository';
import { PatientRepository } from '@/application/repositories/patient-repository';
import { createTraumaOrthopedicRecord } from '@/application/use-cases/specific-records/trauma-orthopedic-record/create-record/create-record';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NestCreateTraumaOrthopedicRecordUseCase extends createTraumaOrthopedicRecord {
  constructor(
    traumaorthopedicRecordRepository: TraumaOrthopedicRecordRepository,
    patientRepository: PatientRepository,
    clinicianRepository: ClinicianRepository,
  ) {
    super(traumaorthopedicRecordRepository, patientRepository, clinicianRepository);
  }
}
