import { ClinicianRepository } from '@/application/repositories/clinician-repository';
import { NeurofunctionalRecordRepository } from '@/application/repositories/neurofunctional-record-repository';
import { PatientRepository } from '@/application/repositories/patient-repository';
import { createNeurofunctionalRecord } from '@/application/use-cases/specific-records/neurofunctional-record/create-record/create-neurofunctional-record';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NestCreateNeurofunctionalRecordUseCase extends createNeurofunctionalRecord {
  constructor(
    neurofunctionalRecordRepository: NeurofunctionalRecordRepository,
    patientRepository: PatientRepository,
    clinicianRepository: ClinicianRepository,
  ) {
    super(neurofunctionalRecordRepository, patientRepository, clinicianRepository);
  }
}
