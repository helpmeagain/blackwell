import { HashGenerator } from '@/application/cryptography/hash-generator';
import { PatientRepository } from '@/application/repositories/patient-repository';
import { UniversalMedicalRecordRepository } from '@/application/repositories/universal-medical-record-repository';
import { CreatePatientUseCase } from '@/application/use-cases/patient/create-patient/create-patient-use-case';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NestCreatePatientUseCase extends CreatePatientUseCase {
  constructor(
    patientRepository: PatientRepository,
    universalMedicalRecordRepository: UniversalMedicalRecordRepository,
    hashGenerator: HashGenerator,
  ) {
    super(patientRepository, universalMedicalRecordRepository, hashGenerator);
  }
}
