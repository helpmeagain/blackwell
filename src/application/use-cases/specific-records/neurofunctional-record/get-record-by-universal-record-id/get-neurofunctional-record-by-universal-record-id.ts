import { Either, left, right } from '@error/either';
import { ResourceNotFound } from '@error/errors/resource-not-found';
import { NeurofunctionalRecord } from '@/domain/entities/specific-records/neurofunctional-record';
import { NeurofunctionalRecordRepository } from '@/application/repositories/neurofunctional-record-repository';

interface getNeurofunctionalByUniversalRecordIdRequest {
  universalRecordId: string;
}

type getNeurofunctionalByUniversalRecordIdResponse = Either<
  ResourceNotFound,
  { neurofunctionalRecord: NeurofunctionalRecord }
>;

export class GetNeurofunctionalByUniversalRecordIdUseCase {
  constructor(private readonly repository: NeurofunctionalRecordRepository) {}

  async execute(
    req: getNeurofunctionalByUniversalRecordIdRequest,
  ): Promise<getNeurofunctionalByUniversalRecordIdResponse> {
    const { universalRecordId } = req;
    const neurofunctionalRecord =
      await this.repository.findByUniversalRecordId(universalRecordId);

    if (!neurofunctionalRecord) {
      return left(new ResourceNotFound());
    }

    return right({ neurofunctionalRecord });
  }
}
