import { ClinicianRepository } from '@/application/repositories/clinician-repository';
import { DeleteClinicianByIdUseCase } from '@/application/use-cases/clinician/delete-clinician-by-id/delete-clinician-by-id-use-case';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NestDeleteClinicianUseCase extends DeleteClinicianByIdUseCase {
  constructor(repository: ClinicianRepository) {
    super(repository);
  }
}
