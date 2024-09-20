import { PatientRepository } from '@/application/repositories/patient-repository';
import { GetUniversalMedicalRecordByIdUseCase } from '@/application/use-cases/universal-medical-record/get-universal-medical-record-by-id/get-universal-medical-record-by-id-use-case';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NestGetUniversalMedicalRecordByIdUseCase extends GetUniversalMedicalRecordByIdUseCase {
  constructor(repository: PatientRepository) {
    super(repository);
  }
}
