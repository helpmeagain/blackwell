import { Clinician } from '@entities/clinician';
import { ClinicianRepository } from '@/application/repositories/clinician-repository';
import { Either, right } from '@/application/common/error-handler/either';

import { Gender } from '@/domain/common/types/gender-type';

export interface createClinicianRequest {
  name: string;
  surname: string;
  gender: Gender;
  phoneNumber: string;
  email: string;
  password: string;
  occupation: string;
}

export type createConsultationResponse = Either<null, { clinician: Clinician }>;

export class CreateClinicianUseCase {
  constructor(private readonly repository: ClinicianRepository) {}

  async execute(req: createClinicianRequest): Promise<createConsultationResponse> {
    const { name, surname, gender, phoneNumber, email, password, occupation } = req;
    const clinician = Clinician.create({
      name,
      surname,
      occupation,
      gender,
      phoneNumber,
      email,
      password,
    });

    await this.repository.create(clinician);
    return right({ clinician });
  }
}
