import { Either, left, right } from '@/application/common/error-handler/either';
import { ResourceNotFound } from '@/application/common/error-handler/errors/resource-not-found';
import { PatientRepository } from '@/application/repositories/patient-repository';
import { Patient } from '@/domain/entities/patient';

interface getPatientByIdRequest {
  patientId: string;
}

type getPatientByIdResponse = Either<ResourceNotFound, { patient: Patient }>;
export class GetPatientByIdUseCase {
  constructor(private readonly repository: PatientRepository) {}

  async execute({ patientId }: getPatientByIdRequest): Promise<getPatientByIdResponse> {
    const patient = await this.repository.findById(patientId);

    if (!patient) {
      return left(new ResourceNotFound());
    }

    return right({ patient });
  }
}
