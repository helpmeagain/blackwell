import { PatientRepository } from '@/application/repositories/patient-repository';
import { GetPatientBySlugUseCase } from '@/application/use-cases/patient/get-patient-by-slug/get-patient-by-slug';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NestGetPatientBySlugUseCase extends GetPatientBySlugUseCase {
  constructor(repository: PatientRepository) {
    super(repository);
  }
}
