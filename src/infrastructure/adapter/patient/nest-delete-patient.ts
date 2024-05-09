import { PatientRepository } from '@/application/repositories/patient-repository';
import { DeletePatientByIdUseCase } from '@/application/use-cases/patient/delete-patient-by-id/delete-patient-by-id-use-case';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NestDeletePatientByIdUseCase extends DeletePatientByIdUseCase {
  constructor(repository: PatientRepository) {
    super(repository);
  }
}
