import { PatientRepository } from '@/application/repositories/patient-repository';
import { GetPatientByCpfUseCase } from '@/application/use-cases/patient/get-patient-by-cpf/get-patient-by-cpf-use-case';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NestGetPatientByCpfUseCase extends GetPatientByCpfUseCase {
  constructor(repository: PatientRepository) {
    super(repository);
  }
}
