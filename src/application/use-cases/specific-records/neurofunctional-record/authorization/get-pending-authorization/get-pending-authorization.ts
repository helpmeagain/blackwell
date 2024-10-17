import { Either, left, right } from '@error/either';
import { ResourceNotFound } from '@error/errors/resource-not-found';
import { NeurofunctionalRecordRepository } from '@/application/repositories/neurofunctional-record-repository';

interface getPendingAuthorizationUsersRequest {
  id: string;
}

type getPendingAuthorizationUsersResponse = Either<
  ResourceNotFound,
  { pendingAuthorizationUsers: string[] }
>;

export class GetPendingAuthorizationUsersUseCase {
  constructor(private readonly repository: NeurofunctionalRecordRepository) {}

  async execute(
    req: getPendingAuthorizationUsersRequest,
  ): Promise<getPendingAuthorizationUsersResponse> {
    const { id } = req;
    const neurofunctionalRecord = await this.repository.findById(id);

    if (!neurofunctionalRecord) {
      return left(new ResourceNotFound());
    }

    const pendingAuthorizationUsers =
      neurofunctionalRecord.pendingAuthorizationUsers ?? [];

    return right({ pendingAuthorizationUsers });
  }
}
