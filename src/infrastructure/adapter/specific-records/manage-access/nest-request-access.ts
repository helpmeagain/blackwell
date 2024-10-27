import { CardiorespiratoryRecordRepository } from '@/application/repositories/cardiorespiratory-record-repository';
import { ClinicianRepository } from '@/application/repositories/clinician-repository';
import { NeurofunctionalRecordRepository } from '@/application/repositories/neurofunctional-record-repository';
import { PatientRepository } from '@/application/repositories/patient-repository';
import { TraumaOrthopedicRecordRepository } from '@/application/repositories/trauma-orthopedic-record-repository';
import { RequestAccessUseCase } from '@/application/use-cases/specific-records/manage-access/request-access/request-access';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NestRequestAccessUseCase extends RequestAccessUseCase {
  constructor(
    neuroRepository: NeurofunctionalRecordRepository,
    traumaRepository: TraumaOrthopedicRecordRepository,
    cardioRepository: CardiorespiratoryRecordRepository,
    patientRepository: PatientRepository,
    clinicianRepository: ClinicianRepository,
  ) {
    super(neuroRepository, cardioRepository, traumaRepository, patientRepository, clinicianRepository);
  }
}
