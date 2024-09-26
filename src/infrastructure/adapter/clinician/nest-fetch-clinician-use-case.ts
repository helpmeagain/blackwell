import { ClinicianRepository } from '@/application/repositories/clinician-repository';
import { FetchClinicianUseCase } from '@/application/use-cases/clinician/fetch-clinician/fetch-clinician-use-case';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NestFetchClinicianUseCase extends FetchClinicianUseCase {
  constructor(repository: ClinicianRepository) {
    super(repository);
  }
}
