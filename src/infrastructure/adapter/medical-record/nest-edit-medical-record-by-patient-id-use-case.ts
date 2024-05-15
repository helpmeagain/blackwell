import { PatientRepository } from '@/application/repositories/patient-repository';
import { EditMedicalRecordByIdUseCase } from '@/application/use-cases/medical-record/edit-medical-record-by-patient-id/edit-medical-record-by-patient-id-use-case';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NestEditMedicalRecordByIdUseCase extends EditMedicalRecordByIdUseCase {
  constructor(repository: PatientRepository) {
    super(repository);
  }
}
