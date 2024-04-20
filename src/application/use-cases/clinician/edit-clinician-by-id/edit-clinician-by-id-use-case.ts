import { Either, left, right } from '@error/either';
import { ResourceNotFound } from '@error/errors/resource-not-found';
import { NotAllowed } from '@error/errors/not-allowed';
import { Clinician } from '@entities/clinician';
import { type ClinicianRepository } from '@application/repositories/clinician-repository';

interface editClinicianByIdRequest {
  clinicianId: string;
  name: string;
  surname: string;
  occupation: string;
}

type editClinicianByIdResponse = Either<
  ResourceNotFound | NotAllowed,
  { clinician: Clinician }
>;

export class EditClinicianByIdUseCase {
  constructor(private readonly repository: ClinicianRepository) {}

  async execute({
    clinicianId,
    name,
    surname,
    occupation,
  }: editClinicianByIdRequest): Promise<editClinicianByIdResponse> {
    const clinician = await this.repository.findById(clinicianId);

    if (!clinician) {
      return left(new ResourceNotFound());
    }

    if (clinicianId !== clinician.id.toString()) {
      return left(new NotAllowed());
    }

    clinician.name = name;
    clinician.surname = surname;
    clinician.occupation = occupation;
    await this.repository.save(clinician);

    return right({ clinician });
  }
}
