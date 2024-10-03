import { Either, left, right } from '@error/either';
import { ResourceNotFound } from '@error/errors/resource-not-found';
import { NeurofunctionalRecord } from '@/domain/entities/specific-records/neurofunctional-record';
import { NeurofunctionalRecordRepository } from '@/application/repositories/neurofunctional-record-repository';

interface getNeurofunctionalByPatientIdRequest {
  patientId: string;
}

type getNeurofunctionalByPatientIdResponse = Either<
  ResourceNotFound,
  { neurofunctionalRecord: NeurofunctionalRecord }
>;

export class GetNeurofunctionalByPatientIdUseCase {
  constructor(private readonly repository: NeurofunctionalRecordRepository) {}

  async execute(
    req: getNeurofunctionalByPatientIdRequest,
  ): Promise<getNeurofunctionalByPatientIdResponse> {
    const { patientId } = req;
    const neurofunctionalRecord = await this.repository.findByPatientId(patientId);

    if (!neurofunctionalRecord) {
      return left(new ResourceNotFound());
    }

    return right({ neurofunctionalRecord });
  }
}
