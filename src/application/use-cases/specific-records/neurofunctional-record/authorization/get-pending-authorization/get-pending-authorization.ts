import { Either, left, right } from '@error/either';
import { ResourceNotFound } from '@error/errors/resource-not-found';
import { NeurofunctionalRecordRepository } from '@/application/repositories/neurofunctional-record-repository';
import { UnauthorizedUser } from '@/application/common/error-handler/errors/unauthorized';

interface getPendingAuthorizationUsersRequest {
  id: string;
  currentUserId: string;
}

type getPendingAuthorizationUsersResponse = Either<
  ResourceNotFound | UnauthorizedUser,
  { pendingAuthorizationUsers: string[] }
>;

export class GetPendingAuthorizationUsersUseCase {
  constructor(private readonly repository: NeurofunctionalRecordRepository) {}

  async execute(
    req: getPendingAuthorizationUsersRequest,
  ): Promise<getPendingAuthorizationUsersResponse> {
    const { id, currentUserId } = req;
    const neurofunctionalRecord = await this.repository.findById(id);

    if (!neurofunctionalRecord) {
      return left(new ResourceNotFound());
    }

    if (neurofunctionalRecord.clinicianId.toString() !== currentUserId) {
      return left(new UnauthorizedUser());
    }

    const pendingAuthorizationUsers =
      neurofunctionalRecord.pendingAuthorizationUsers ?? [];

    return right({ pendingAuthorizationUsers });
  }
}
