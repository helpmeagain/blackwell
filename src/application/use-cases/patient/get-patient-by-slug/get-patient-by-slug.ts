import { Either, left, right } from '@error/either';
import { ResourceNotFound } from '@error/errors/resource-not-found';
import { PatientRepository } from '@/application/repositories/patient-repository';
import { Patient } from '@/domain/entities/patient';

interface getPatientBySlugRequest {
  slug: string;
}

type getPatientBySlugResponse = Either<ResourceNotFound, { patient: Patient[] }>;

export class GetPatientBySlugUseCase {
  constructor(private readonly repository: PatientRepository) {}

  async execute({ slug }: getPatientBySlugRequest): Promise<getPatientBySlugResponse> {
    const patient = await this.repository.findBySlug(slug);

    if (patient === null || !patient.length) {
      return left(new ResourceNotFound());
    }

    return right({ patient });
  }
}
