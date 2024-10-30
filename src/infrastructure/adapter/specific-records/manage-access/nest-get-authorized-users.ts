import { CardiorespiratoryRecordRepository } from '@/application/repositories/cardiorespiratory-record-repository';
import { ClinicianRepository } from '@/application/repositories/clinician-repository';
import { NeurofunctionalRecordRepository } from '@/application/repositories/neurofunctional-record-repository';
import { PatientRepository } from '@/application/repositories/patient-repository';
import { TraumaOrthopedicRecordRepository } from '@/application/repositories/trauma-orthopedic-record-repository';
import { GetAuthorizedUsersUseCase } from '@/application/use-cases/specific-records/manage-access/get-authorized-users/get-authorized-users';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NestGetAuthorizedUsersUseCase extends GetAuthorizedUsersUseCase {
  constructor(
    neuroRepository: NeurofunctionalRecordRepository,
    traumaRepository: TraumaOrthopedicRecordRepository,
    cardioRepository: CardiorespiratoryRecordRepository,
    patientRepository: PatientRepository,
    clinicianRepository: ClinicianRepository,
  ) {
    super(neuroRepository, traumaRepository, cardioRepository, patientRepository, clinicianRepository);
  }
}
