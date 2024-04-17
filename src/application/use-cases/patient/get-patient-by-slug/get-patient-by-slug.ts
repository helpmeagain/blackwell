import { Either, left, right } from '@/application/common/error-handler/either';
import { ResourceNotFound } from '@/application/common/error-handler/errors/resource-not-found';
import { PatientRepository } from '@/application/repositories/patient-repository';
import { Patient } from '@/domain/entities/patient';

interface getPatientBySlugRequest {
  slug: string;
}

type getPatientBySlugResponse = Either<ResourceNotFound, { patient: Patient }>;

export class GetPatientBySlugUseCase {
  constructor(private readonly repository: PatientRepository) {}

  async execute({ slug }: getPatientBySlugRequest): Promise<getPatientBySlugResponse> {
    const patient = await this.repository.findBySlug(slug);

    if (!patient) {
      return left(new ResourceNotFound());
    }

    return right({ patient });
  }
}
