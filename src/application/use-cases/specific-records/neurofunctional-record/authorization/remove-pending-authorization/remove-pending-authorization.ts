import { Either, left, right } from '@error/either';
import { ResourceNotFound } from '@error/errors/resource-not-found';
import { NeurofunctionalRecord } from '@/domain/entities/specific-records/neurofunctional-record';
import { NeurofunctionalRecordRepository } from '@/application/repositories/neurofunctional-record-repository';
import { UnauthorizedUser } from '@/application/common/error-handler/errors/unauthorized';

interface removePendingAuthorizationRequest {
  recordId: string;
  userId: string;
  currentUserId: string;
}

type removePendingAuthorizationResponse = Either<
  ResourceNotFound | UnauthorizedUser,
  { neurofunctionalRecord: NeurofunctionalRecord }
>;

export class RemovePendingAuthorizationUseCase {
  constructor(private readonly recordRepository: NeurofunctionalRecordRepository) {}

  async execute(
    req: removePendingAuthorizationRequest,
  ): Promise<removePendingAuthorizationResponse> {
    const { recordId, userId, currentUserId } = req;
    const neurofunctionalRecord = await this.recordRepository.findById(recordId);

    if (!neurofunctionalRecord) {
      return left(new ResourceNotFound('Neurofunctional Record'));
    }

    if (
      !neurofunctionalRecord.pendingAuthorizationUsers ||
      !neurofunctionalRecord.pendingAuthorizationUsers.includes(userId)
    ) {
      return left(new ResourceNotFound('User'));
    }

    if (neurofunctionalRecord.patientId.toString() !== currentUserId) {
      return left(new UnauthorizedUser());
    }

    await this.recordRepository.removePendingAuthorization(neurofunctionalRecord, userId);

    return right({ neurofunctionalRecord });
  }
}
