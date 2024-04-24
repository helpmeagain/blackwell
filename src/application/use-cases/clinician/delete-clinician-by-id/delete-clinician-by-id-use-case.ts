import { Either, left, right } from '@error/either';
import { ResourceNotFound } from '@error/errors/resource-not-found';
import { NotAllowed } from '@error/errors/not-allowed';
import { ClinicianRepository } from '@/application/repositories/clinician-repository';

export interface deleteClinicianByIdRequest {
  clinicianId: string;
}

export type deleteClinicianByIdResponse = Either<
  ResourceNotFound | NotAllowed,
  Record<string, never>
>;

export class DeleteClinicianByIdUseCase {
  constructor(private readonly repository: ClinicianRepository) {}

  async execute(req: deleteClinicianByIdRequest): Promise<deleteClinicianByIdResponse> {
    const { clinicianId } = req;
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
