import { Either, left, right } from '@application/common/error-handler/either';
import { Patient } from '@entities/patient';
import { PatientRepository } from '@/application/repositories/patient-repository';
import { BadRequest } from '@/application/common/error-handler/errors/bad-request';

interface createPatientRequest {
  name: string;
  surname: string;
  birthDate: Date;
  phoneNumber: string;
  email: string;
}

type createConsultationResponse = Either<BadRequest, { patient: Patient }>;

export class CreatePatientUseCase {
  constructor(private readonly repository: PatientRepository) {}

  async execute({
    name,
    surname,
    birthDate,
    phoneNumber,
    email,
  }: createPatientRequest): Promise<createConsultationResponse> {
    const patient = Patient.create({
      name,
      surname,
      birthDate,
      phoneNumber,
      email,
    });

    if (!(birthDate instanceof Date) || isNaN(birthDate.getTime())) {
      return left(new BadRequest());
    }

    const phoneNumberRegex = /^\+[1-9]\d{1,14}$/;
    if (!phoneNumberRegex.test(phoneNumber)) {
      return left(new BadRequest());
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return left(new BadRequest());
    }

    await this.repository.create(patient);
    return right({ patient });
  }
}
