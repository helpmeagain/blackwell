import { ConsultationRepository } from '@/application/repositories/consultation-repository';
import { PatientRepository } from '@/application/repositories/patient-repository';
import { EditConsultationByIdUseCase } from '@/application/use-cases/consultation/edit-consultation-by-id/edit-consultation-by-id-use-case';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NestEditConsultationByIdUseCase extends EditConsultationByIdUseCase {
  constructor(
    consultationRepository: ConsultationRepository,
    patientRecordRepository: PatientRepository,
  ) {
    super(consultationRepository, patientRecordRepository);
  }
}
