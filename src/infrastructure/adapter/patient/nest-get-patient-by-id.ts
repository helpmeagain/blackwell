import { PatientRepository } from '@/application/repositories/patient-repository';
import { GetPatientByIdUseCase } from '@/application/use-cases/patient/get-patient-by-id/get-patient-by-id-use-case';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NestGetPatientByIdUseCase extends GetPatientByIdUseCase {
  constructor(repository: PatientRepository) {
    super(repository);
  }
}
