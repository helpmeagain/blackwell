import { Either, left, right } from '@error/either';
import { NotAllowed } from '@error/errors/not-allowed';
import { ResourceNotFound } from '@error/errors/resource-not-found';
import { PatientRepository } from '@/application/repositories/patient-repository';
import { UnauthorizedUser } from '@/application/common/error-handler/errors/unauthorized';

interface deletePatientByIdRequest {
  patientId: string;
  currentUserId: string;
}

type deletePatientByIdResponse = Either<
  ResourceNotFound | NotAllowed,
  Record<string, never>
>;

export class DeletePatientByIdUseCase {
  constructor(private readonly repository: PatientRepository) {}

  async execute({
    patientId,
    currentUserId,
  }: deletePatientByIdRequest): Promise<deletePatientByIdResponse> {
    const patient = await this.repository.findById(patientId);

    if (!patient) {
      return left(new ResourceNotFound());
    }

    if (currentUserId !== patient.id.toString()) {
      return left(new UnauthorizedUser());
    }

    await this.repository.delete(patient);
    return right({});
  }
}
