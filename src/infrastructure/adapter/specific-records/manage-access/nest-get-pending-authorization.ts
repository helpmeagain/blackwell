import { ClinicianRepository } from '@/application/repositories/clinician-repository';
import { NeurofunctionalRecordRepository } from '@/application/repositories/neurofunctional-record-repository';
import { PatientRepository } from '@/application/repositories/patient-repository';
import { GetPendingAuthorizationUsersUseCase } from '@/application/use-cases/specific-records/manage-access/get-pending-authorization/get-pending-authorization';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NestGetPendingAuthorizationUsersUseCase extends GetPendingAuthorizationUsersUseCase {
  constructor(
    neuroRepository: NeurofunctionalRecordRepository,
    patientRepository: PatientRepository,
    clinicianRepository: ClinicianRepository,
  ) {
    super(neuroRepository, patientRepository, clinicianRepository);
  }
}