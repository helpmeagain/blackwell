import { ClinicianRepository } from '@/application/repositories/clinician-repository';
import { GetClinicianBySlugUseCase } from '@/application/use-cases/clinician/get-clinician-by-slug/get-clinician-by-slug-use-case';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NestGetClinicianBySlugUseCase extends GetClinicianBySlugUseCase {
  constructor(repository: ClinicianRepository) {
    super(repository);
  }
}
