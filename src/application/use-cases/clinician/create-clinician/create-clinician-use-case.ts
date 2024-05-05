import { Clinician } from '@entities/clinician';
import { ClinicianRepository } from '@/application/repositories/clinician-repository';
import { Either, left, right } from '@/application/common/error-handler/either';
import { Gender } from '@/domain/common/types/gender-type';
import { HashGenerator } from '@/application/cryptography/hash-generator';
import { UserAlreadyExists } from '@/application/common/error-handler/errors/user-already-exists';

export interface createClinicianRequest {
  name: string;
  surname: string;
  gender: Gender;
  phoneNumber: string;
  email: string;
  password: string;
  occupation: string;
}

export type createConsultationResponse = Either<
  UserAlreadyExists,
  { clinician: Clinician }
>;

export class CreateClinicianUseCase {
  constructor(
    private readonly repository: ClinicianRepository,
    private readonly hashGenerator: HashGenerator,
  ) {}

  async execute(req: createClinicianRequest): Promise<createConsultationResponse> {
    const { name, surname, gender, phoneNumber, email, password, occupation } = req;

    const clinicianWithEmailAlreadyExists = await this.repository.findByEmail(email);

    if (clinicianWithEmailAlreadyExists) {
      return left(new UserAlreadyExists('email', email));
    }

    const hashedPassword = await this.hashGenerator.hash(password);

    const clinician = Clinician.create({
      name,
      surname,
      occupation,
      gender,
      phoneNumber,
      email,
      password: hashedPassword,
    });

    await this.repository.create(clinician);
    return right({ clinician });
  }
}
