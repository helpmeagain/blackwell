import { Either, right } from '@error/either';
import { Patient } from '@entities/patient';
import { type PatientRepository } from '@application/repositories/patient-repository';

interface fetchPatientRequest {
  page?: number;
  orderBy?: {
    field: string;
    direction?: 'asc' | 'desc';
  };
}

type fetchPatientResponse = Either<null, { patients: Patient[] }>;

export class FetchPatientUseCase {
  constructor(private readonly repository: PatientRepository) {}

  async execute({
    page = 1,
    orderBy = { field: 'createdAt', direction: 'desc' },
  }: fetchPatientRequest): Promise<fetchPatientResponse> {
    const patients = await this.repository.findMany({
      page,
      orderBy: {
        field: orderBy.field ?? 'createdAt',
        direction: orderBy.direction ?? 'desc',
      },
    });

    return right({ patients });
  }
}
