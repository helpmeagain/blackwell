import { Either, left, right } from '@error/either';
import { ResourceNotFound } from '@error/errors/resource-not-found';
import { Patient } from '@entities/patient';
import { type PatientRepository } from '@application/repositories/patient-repository';
import { Gender } from '@/domain/common/types/gender-type';
import { HashGenerator } from '@/application/cryptography/hash-generator';
import { UnauthorizedUser } from '@/application/common/error-handler/errors/unauthorized';

interface editPatientByIdRequest {
  patientId: string;
  currentUserId: string;
  name: string;
  surname: string;
  gender: Gender;
  birthDate: Date;
  cpf: string;
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  email: string;
  password: string;
}

type editPatientByIdResponse = Either<
  ResourceNotFound | UnauthorizedUser,
  { patient: Patient }
>;

export class EditPatientByIdUseCase {
  constructor(
    private readonly repository: PatientRepository,
    private readonly hashGenerator: HashGenerator,
  ) {}

  async execute(req: editPatientByIdRequest): Promise<editPatientByIdResponse> {
    const {
      patientId,
      currentUserId,
      name,
      surname,
      gender,
      birthDate,
      cpf,
      address,
      city,
      state,
      phoneNumber,
      email,
      password,
    } = req;
    const patient = await this.repository.findById(patientId);

    if (!patient) {
      return left(new ResourceNotFound());
    }

    if (currentUserId !== patient.id.toString()) {
      return left(new UnauthorizedUser());
    }

    const hashedPassword = await this.hashGenerator.hash(password);

    patient.name = name;
    patient.surname = surname;
    patient.gender = gender;
    patient.birthDate = birthDate;
    patient.cpf = cpf;
    patient.address = address;
    patient.city = city;
    patient.state = state;
    patient.phoneNumber = phoneNumber;
    patient.email = email;
    patient.password = hashedPassword;
    await this.repository.save(patient);

    return right({ patient });
  }
}
