import { PatientRepository } from '@/application/repositories/patient-repository';
import { EditUniversalMedicalRecordByPatientIdUseCase } from '@/application/use-cases/universal-medical-record/edit-universal-medical-record-by-patient-id/edit-universal-medical-record-by-patient-id-use-case';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NestEditUniversalMedicalRecordByPatientIdUseCase extends EditUniversalMedicalRecordByPatientIdUseCase {
  constructor(repository: PatientRepository) {
    super(repository);
  }
}
