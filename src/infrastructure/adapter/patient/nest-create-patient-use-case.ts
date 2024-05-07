import { HashGenerator } from '@/application/cryptography/hash-generator';
import { PatientRepository } from '@/application/repositories/patient-repository';
import { CreatePatientUseCase } from '@/application/use-cases/patient/create-patient/create-patient-use-case';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NestCreatePatientUseCase extends CreatePatientUseCase {
  constructor(repository: PatientRepository, hashGenerator: HashGenerator) {
    super(repository, hashGenerator);
  }
}
