import { Either, left, right } from '@error/either';
import { BadRequest } from '@error/errors/bad-request';
import { Patient } from '@entities/patient';
import { PatientRepository } from '@/application/repositories/patient-repository';
import { Gender } from '@/domain/common/types/gender-type';

interface createPatientRequest {
  name: string;
  surname: string;
  gender: Gender;
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
    gender,
    birthDate,
    phoneNumber,
    email,
  }: createPatientRequest): Promise<createConsultationResponse> {
    const patient = Patient.create({
      name,
      surname,
      gender,
      birthDate,
      phoneNumber,
      email,
    });

    if (!['male', 'female', 'non-binary', 'other'].includes(gender)) {
      return left(new BadRequest());
    }

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
