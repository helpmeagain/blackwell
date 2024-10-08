import { PatientRepository } from '@/application/repositories/patient-repository';
import { Either, left, right } from '@/application/common/error-handler/either';
import { HashComparator } from '@/application/cryptography/hash-comparator';
import { Encrypter } from '@/application/cryptography/encrypter';
import { WrongCredentials } from '@/application/common/error-handler/errors/wrong-credentials';

export interface authenticatePatientRequest {
  email: string;
  password: string;
}

export type authenticateConsultationResponse = Either<
  WrongCredentials,
  { accessToken: string }
>;

export class AuthenticatePatientUseCase {
  constructor(
    private readonly repository: PatientRepository,
    private readonly hashComparator: HashComparator,
    private readonly encrypter: Encrypter,
  ) {}

  async execute(
    req: authenticatePatientRequest,
  ): Promise<authenticateConsultationResponse> {
    const { email, password } = req;

    const patient = await this.repository.findByEmail(email);

    if (!patient) {
      return left(new WrongCredentials());
    }

    const hashedPassword = await this.hashComparator.compare(password, patient.password);

    if (!hashedPassword) {
      return left(new WrongCredentials());
    }

    const accessToken = await this.encrypter.encrypt({
      sub: patient.id.toString(),
      role: 'CLIENT',
    });
    return right({ accessToken });
  }
}
