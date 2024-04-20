import { Either, left, right } from '@error/either';
import { NotAllowed } from '@error/errors/not-allowed';
import { ResourceNotFound } from '@error/errors/resource-not-found';
import { PatientRepository } from '@/application/repositories/patient-repository';

interface deletePatientByIdRequest {
  patientId: string;
}

type deletePatientByIdResponse = Either<
  ResourceNotFound | NotAllowed,
  Record<string, never>
>;

export class DeletePatientByIdUseCase {
  constructor(private readonly repository: PatientRepository) {}

  async execute({
    patientId,
  }: deletePatientByIdRequest): Promise<deletePatientByIdResponse> {
    const patient = await this.repository.findById(patientId);

    if (!patient) {
      return left(new ResourceNotFound());
    }

    if (patientId !== patient.id.toString()) {
      return left(new NotAllowed());
    }

    await this.repository.delete(patient);
    return right({});
  }
}
