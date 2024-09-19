import { PatientRepository } from '@/application/repositories/patient-repository';
import { FetchPatientUseCase } from '@/application/use-cases/patient/fetch-patient/fetch-patient-use-case';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NestFetchPatientUseCase extends FetchPatientUseCase {
  constructor(repository: PatientRepository) {
    super(repository);
  }
}
