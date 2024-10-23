import { ClinicianRepository } from '@/application/repositories/clinician-repository';
import { NeurofunctionalRecordRepository } from '@/application/repositories/neurofunctional-record-repository';
import { PatientRepository } from '@/application/repositories/patient-repository';
import { AskForAuthorizationUseCase } from '@/application/use-cases/specific-records/neurofunctional-record/authorization/ask-for-authorization/ask-for-authorization';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NestAskForAuthorizationUseCase extends AskForAuthorizationUseCase {
  constructor(
    recordRepository: NeurofunctionalRecordRepository,
    patientRepository: PatientRepository,
    clinicianRepository: ClinicianRepository,
  ) {
    super(recordRepository, patientRepository, clinicianRepository);
  }
}
