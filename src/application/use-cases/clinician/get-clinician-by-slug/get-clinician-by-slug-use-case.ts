import { Either, left, right } from '@error/either';
import { ResourceNotFound } from '@error/errors/resource-not-found';
import { ClinicianRepository } from '@/application/repositories/clinician-repository';
import { Clinician } from '@/domain/entities/clinician';

interface getClinicianBySlugRequest {
  slug: string;
}

type getClinicianBySlugResponse = Either<ResourceNotFound, { clinician: Clinician }>;

export class GetClinicianBySlugUseCase {
  constructor(private readonly repository: ClinicianRepository) {}

  async execute(req: getClinicianBySlugRequest): Promise<getClinicianBySlugResponse> {
    const { slug } = req;
    const clinician = await this.repository.findBySlug(slug);

    if (!clinician) {
      return left(new ResourceNotFound());
    }

    return right({ clinician });
  }
}
