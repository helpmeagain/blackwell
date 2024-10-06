import { Either, left, right } from '@error/either';
import { ResourceNotFound } from '@error/errors/resource-not-found';
import { NeurofunctionalRecord } from '@/domain/entities/specific-records/neurofunctional-record';
import { NeurofunctionalRecordRepository } from '@/application/repositories/neurofunctional-record-repository';

interface getNeurofunctionalByIdRequest {
  id: string;
}

type getNeurofunctionalByIdResponse = Either<
  ResourceNotFound,
  { neurofunctionalRecord: NeurofunctionalRecord }
>;

export class GetNeurofunctionalByIdUseCase {
  constructor(private readonly repository: NeurofunctionalRecordRepository) {}

  async execute(
    req: getNeurofunctionalByIdRequest,
  ): Promise<getNeurofunctionalByIdResponse> {
    const { id } = req;
    const neurofunctionalRecord = await this.repository.findById(id);

    if (!neurofunctionalRecord) {
      return left(new ResourceNotFound());
    }

    return right({ neurofunctionalRecord });
  }
}
