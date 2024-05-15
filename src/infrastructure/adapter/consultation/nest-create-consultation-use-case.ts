import { ClinicianRepository } from '@/application/repositories/clinician-repository';
import { ConsultationRepository } from '@/application/repositories/consultation-repository';
import { PatientRepository } from '@/application/repositories/patient-repository';
import { CreateConsultationUseCase } from '@/application/use-cases/consultation/create-consultation/create-consultation-use-case';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NestCreateConsultationUseCase extends CreateConsultationUseCase {
  constructor(
    consultationRepository: ConsultationRepository,
    patientRepository: PatientRepository,
    clinicianRepository: ClinicianRepository,
  ) {
    super(consultationRepository, patientRepository, clinicianRepository);
  }
}
