import { PatientRepository } from '@/application/repositories/patient-repository';
import { EditMedicalRecordByPatientIdUseCase } from '@/application/use-cases/medical-record/edit-medical-record-by-patient-id/edit-medical-record-by-patient-id-use-case';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NestEditMedicalRecordByPatientIdUseCase extends EditMedicalRecordByPatientIdUseCase {
  constructor(repository: PatientRepository) {
    super(repository);
  }
}
