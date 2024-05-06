import { Encrypter } from '@/application/cryptography/encrypter';
import { HashComparator } from '@/application/cryptography/hash-comparator';
import { ClinicianRepository } from '@/application/repositories/clinician-repository';
import { AuthenticateClinicianUseCase } from '@/application/use-cases/authenticate/clinician/authenticate-clinician-use-case';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NestAuthenticateClinicianUseCase extends AuthenticateClinicianUseCase {
  constructor(
    repository: ClinicianRepository,
    hashComparator: HashComparator,
    encrypter: Encrypter,
  ) {
    super(repository, hashComparator, encrypter);
  }
}
