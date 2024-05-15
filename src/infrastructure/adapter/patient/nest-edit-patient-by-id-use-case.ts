import { PatientRepository } from '@/application/repositories/patient-repository';
import { EditPatientByIdUseCase } from '@/application/use-cases/patient/edit-patient-by-id/edit-patient-by-id-use-case';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NestEditPatientByIdUseCase extends EditPatientByIdUseCase {
  constructor(repository: PatientRepository) {
    super(repository);
  }
}
