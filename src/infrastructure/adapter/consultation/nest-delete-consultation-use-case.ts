import { ConsultationRepository } from '@/application/repositories/consultation-repository';
import { PatientRepository } from '@/application/repositories/patient-repository';
import { DeleteConsultationByIdUseCase } from '@/application/use-cases/consultation/delete-consultation-by-id/delete-consultation-by-id-use-case';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NestDeleteConsultationByIdUseCase extends DeleteConsultationByIdUseCase {
  constructor(
    consultationRepository: ConsultationRepository,
    patientRepository: PatientRepository,
  ) {
    super(consultationRepository, patientRepository);
  }
}
