import { Either, left, right } from '@error/either';
import { ResourceNotFound } from '@error/errors/resource-not-found';
import { ClinicianRepository } from '@/application/repositories/clinician-repository';
import { UnauthorizedUser } from '@/application/common/error-handler/errors/unauthorized';

export interface deleteClinicianByIdRequest {
  clinicianId: string;
  currentUserId: string;
}

export type deleteClinicianByIdResponse = Either<
  ResourceNotFound | UnauthorizedUser,
  Record<string, never>
>;

export class DeleteClinicianByIdUseCase {
  constructor(private readonly repository: ClinicianRepository) {}

  async execute(req: deleteClinicianByIdRequest): Promise<deleteClinicianByIdResponse> {
    const { clinicianId, currentUserId } = req;
    const clinician = await this.repository.findById(clinicianId);

    if (!clinician) {
      return left(new ResourceNotFound());
    }

    if (currentUserId !== clinician.id.toString()) {
      return left(new UnauthorizedUser());
    }

    await this.repository.delete(clinician);
    return right({});
  }
}
