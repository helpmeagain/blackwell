import { Encrypter } from '@/application/cryptography/encrypter';
import { HashComparator } from '@/application/cryptography/hash-comparator';
import { PatientRepository } from '@/application/repositories/patient-repository';
import { AuthenticatePatientUseCase } from '@/application/use-cases/authenticate/patient/authenticate-patient-use-case';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NestAuthenticatePatientUseCase extends AuthenticatePatientUseCase {
  constructor(
    repository: PatientRepository,
    hashComparator: HashComparator,
    encrypter: Encrypter,
  ) {
    super(repository, hashComparator, encrypter);
  }
}
