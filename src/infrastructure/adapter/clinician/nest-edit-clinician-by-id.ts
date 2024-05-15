import { HashGenerator } from '@/application/cryptography/hash-generator';
import { ClinicianRepository } from '@/application/repositories/clinician-repository';
import { EditClinicianByIdUseCase } from '@/application/use-cases/clinician/edit-clinician-by-id/edit-clinician-by-id-use-case';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NestEditClinicianUseCase extends EditClinicianByIdUseCase {
  constructor(repository: ClinicianRepository, hashGenerator: HashGenerator) {
    super(repository, hashGenerator);
  }
}
