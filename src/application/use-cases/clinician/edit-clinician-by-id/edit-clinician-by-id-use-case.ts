import { Either, left, right } from '@error/either';
import { ResourceNotFound } from '@error/errors/resource-not-found';
import { NotAllowed } from '@error/errors/not-allowed';
import { type ClinicianRepository } from '@application/repositories/clinician-repository';
import { Clinician } from '@/domain/entities/clinician';
import { Gender } from '@/domain/common/types/gender-type';
import { HashGenerator } from '@/application/cryptography/hash-generator';

export interface editClinicianByIdRequest {
  clinicianId: string;
  name: string;
  surname: string;
  occupation: string;
  gender: Gender;
  phoneNumber: string;
  email: string;
  password: string;
}

export type editClinicianByIdResponse = Either<
  ResourceNotFound | NotAllowed,
  { clinician: Clinician }
>;

export class EditClinicianByIdUseCase {
  constructor(
    private readonly repository: ClinicianRepository,
    private readonly hashGenerator: HashGenerator,
  ) {}

  async execute(req: editClinicianByIdRequest): Promise<editClinicianByIdResponse> {
    const {
      clinicianId,
      name,
      surname,
      gender,
      phoneNumber,
      email,
      password,
      occupation,
    } = req;
    const clinician = await this.repository.findById(clinicianId);

    if (!clinician) {
      return left(new ResourceNotFound());
    }

    if (clinicianId !== clinician.id.toString()) {
      return left(new NotAllowed());
    }

    const hashedPassword = await this.hashGenerator.hash(password);

    clinician.name = name;
    clinician.surname = surname;
    clinician.gender = gender;
    clinician.phoneNumber = phoneNumber;
    clinician.email = email;
    clinician.occupation = occupation;
    clinician.password = hashedPassword;

    await this.repository.save(clinician);
    return right({ clinician });
  }
}
