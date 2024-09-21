import { UniversalMedicalRecordRepository } from '@/application/repositories/universal-medical-record-repository';
import { GetUniversalMedicalRecordByPatientIdUseCase } from '@/application/use-cases/universal-medical-record/get-universal-medical-record-by-patient-id/get-universal-medical-record-by-patient-id-use-case';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NestGetUniversalMedicalRecordByPatientIdUseCase extends GetUniversalMedicalRecordByPatientIdUseCase {
  constructor(repository: UniversalMedicalRecordRepository) {
    super(repository);
  }
}
