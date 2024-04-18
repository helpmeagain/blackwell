import { Either, right } from '@application/common/error-handler/either';
import { Clinician } from '@entities/clinician';
import { ClinicianRepository } from '@/application/repositories/clinician-repository';

interface createClinicianRequest {
  name: string;
  surname: string;
  occupation: string;
}

type createConsultationResponse = Either<null, { clinician: Clinician }>;

export class CreateClinicianUseCase {
  constructor(private readonly repository: ClinicianRepository) {}

  async execute({
    name,
    surname,
    occupation,
  }: createClinicianRequest): Promise<createConsultationResponse> {
    const clinician = Clinician.create({
      name,
      surname,
      occupation,
    });

    await this.repository.create(clinician);
    return right({ clinician });
  }
}
