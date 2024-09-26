import { Either, right } from '@error/either';
import { Clinician } from '@entities/clinician';
import { type ClinicianRepository } from '@application/repositories/clinician-repository';

interface fetchClinicianRequest {
  page?: number;
  orderBy?: {
    field: string;
    direction?: 'asc' | 'desc';
  };
}

type fetchClinicianResponse = Either<null, { clinicians: Clinician[] }>;

export class FetchClinicianUseCase {
  constructor(private readonly repository: ClinicianRepository) {}

  async execute({
    page = 1,
    orderBy = { field: 'createdAt', direction: 'desc' },
  }: fetchClinicianRequest): Promise<fetchClinicianResponse> {
    const clinicians = await this.repository.findMany({
      page,
      orderBy: {
        field: orderBy.field ?? 'createdAt',
        direction: orderBy.direction ?? 'desc',
      },
    });

    return right({ clinicians });
  }
}
