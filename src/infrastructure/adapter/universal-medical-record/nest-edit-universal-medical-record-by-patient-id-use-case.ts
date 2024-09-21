import { UniversalMedicalRecordRepository } from '@/application/repositories/universal-medical-record-repository';
import { EditUniversalMedicalRecordByPatientIdUseCase } from '@/application/use-cases/universal-medical-record/edit-universal-medical-record-by-patient-id/edit-universal-medical-record-by-patient-id-use-case';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NestEditUniversalMedicalRecordByPatientIdUseCase extends EditUniversalMedicalRecordByPatientIdUseCase {
  constructor(repository: UniversalMedicalRecordRepository) {
    super(repository);
  }
}
