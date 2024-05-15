import { ClinicianRepository } from '@/application/repositories/clinician-repository';
import { GetClinicianByIdUseCase } from '@/application/use-cases/clinician/get-clinician-by-id/get-clinician-by-id-use-case';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NestGetClinicianByIdUseCase extends GetClinicianByIdUseCase {
  constructor(repository: ClinicianRepository) {
    super(repository);
  }
}
