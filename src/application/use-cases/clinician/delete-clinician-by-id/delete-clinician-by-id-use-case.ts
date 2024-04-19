import { Either, left, right } from '@/application/common/error-handler/either';
import { NotAllowed } from '@/application/common/error-handler/errors/not-allowed';
import { ResourceNotFound } from '@/application/common/error-handler/errors/resource-not-found';
import { ClinicianRepository } from '@/application/repositories/clinician-repository';

interface deleteClinicianByIdRequest {
  clinicianId: string;
}

type deleteClinicianByIdResponse = Either<
  ResourceNotFound | NotAllowed,
  Record<string, never>
>;

export class DeleteClinicianByIdUseCase {
  constructor(private readonly repository: ClinicianRepository) {}

  async execute({
    clinicianId,
  }: deleteClinicianByIdRequest): Promise<deleteClinicianByIdResponse> {
    const clinician = await this.repository.findById(clinicianId);

    if (!clinician) {
      return left(new ResourceNotFound());
    }

    if (clinicianId !== clinician.id.toString()) {
      return left(new NotAllowed());
    }

    await this.repository.delete(clinician);
    return right({});
  }
}
