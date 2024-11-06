import { Either, left, right } from '@error/either';
import { ResourceNotFound } from '@error/errors/resource-not-found';
import { PatientRepository } from '@/application/repositories/patient-repository';
import { Patient } from '@/domain/entities/patient';

interface getPatientByCpfRequest {
  cpf: string;
}

type getPatientByCpfResponse = Either<ResourceNotFound, { patient: Patient }>;
export class GetPatientByCpfUseCase {
  constructor(private readonly repository: PatientRepository) {}

  async execute({ cpf }: getPatientByCpfRequest): Promise<getPatientByCpfResponse> {
    const patient = await this.repository.findByCpf(cpf);

    if (!patient) {
      return left(new ResourceNotFound());
    }

    return right({ patient });
  }
}
