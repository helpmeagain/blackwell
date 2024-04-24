import { Either, left, right } from '@error/either';
import { ResourceNotFound } from '@error/errors/resource-not-found';
import { ClinicianRepository } from '@/application/repositories/clinician-repository';
import { Clinician } from '@/domain/entities/clinician';

interface getClinicianByIdRequest {
  clinicianId: string;
}

type getClinicianByIdResponse = Either<ResourceNotFound, { clinician: Clinician }>;

export class GetClinicianByIdUseCase {
  constructor(private readonly repository: ClinicianRepository) {}

  async execute(req: getClinicianByIdRequest): Promise<getClinicianByIdResponse> {
    const { clinicianId } = req;
    const clinician = await this.repository.findById(clinicianId);

    if (!clinician) {
      return left(new ResourceNotFound());
    }

    return right({ clinician });
  }
}
