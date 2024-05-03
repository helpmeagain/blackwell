import { ClinicianRepository } from '@/application/repositories/clinician-repository';
import { CreateClinicianUseCase } from '@/application/use-cases/clinician/create-clinician/create-clinician-use-case';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NestCreateClinicianUseCase extends CreateClinicianUseCase {
  constructor(repository: ClinicianRepository) {
    super(repository);
  }
}
