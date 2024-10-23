import { Either, left, right } from '@error/either';
import { ResourceNotFound } from '@error/errors/resource-not-found';
import { type ClinicianRepository } from '@application/repositories/clinician-repository';
import { Clinician } from '@/domain/entities/clinician';
import { Gender } from '@/domain/common/types/gender-type';
import { HashGenerator } from '@/application/cryptography/hash-generator';
import { UnauthorizedUser } from '@/application/common/error-handler/errors/unauthorized';

export interface editClinicianByIdRequest {
  clinicianId: string;
  currentUserId: string;
  name?: string;
  surname?: string;
  occupation?: string;
  gender?: Gender;
  phoneNumber?: string;
  email?: string;
  password?: string;
}

export type editClinicianByIdResponse = Either<
  ResourceNotFound | UnauthorizedUser,
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
      currentUserId,
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

    if (currentUserId !== clinician.id.toString()) {
      return left(new UnauthorizedUser());
    }

    if (password) {
      const hashedPassword = await this.hashGenerator.hash(password);
      clinician.password = hashedPassword;
    }

    clinician.name = name ?? clinician.name;
    clinician.surname = surname ?? clinician.surname;
    clinician.gender = gender ?? clinician.gender;
    clinician.phoneNumber = phoneNumber ?? clinician.phoneNumber;
    clinician.email = email ?? clinician.email;
    clinician.occupation = occupation ?? clinician.occupation;
    await this.repository.save(clinician);
    return right({ clinician });
  }
}
