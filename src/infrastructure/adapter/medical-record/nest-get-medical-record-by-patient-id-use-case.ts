import { PatientRepository } from '@/application/repositories/patient-repository';
import { GetMedicalRecordByPatientIdUseCase } from '@/application/use-cases/medical-record/get-medical-record-by-patient-id/get-medical-record-by-patient-id-use-case';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NestGetMedicalRecordByPatientIdUseCase extends GetMedicalRecordByPatientIdUseCase {
  constructor(repository: PatientRepository) {
    super(repository);
  }
}
