import { PatientRepository } from '@/application/repositories/patient-repository';
import { GetMedicalRecordByIdUseCase } from '@/application/use-cases/medical-record/get-medical-record-by-id/get-medical-record-by-id-use-case';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NestGetMedicalRecordByIdUseCase extends GetMedicalRecordByIdUseCase {
  constructor(repository: PatientRepository) {
    super(repository);
  }
}
