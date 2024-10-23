import { Either, left, right } from '@error/either';
import { ResourceNotFound } from '@error/errors/resource-not-found';
import { NeurofunctionalRecord } from '@/domain/entities/specific-records/neurofunctional-record';
import { NeurofunctionalRecordRepository } from '@/application/repositories/neurofunctional-record-repository';
import { UnauthorizedUser } from '@/application/common/error-handler/errors/unauthorized';

interface denyPendingAuthorizationRequest {
  recordType: 'Neurofunctional' | 'Trauma' | 'Cardio';
  userId: string;
  currentUserId: string;
}

type denyPendingAuthorizationResponse = Either<
  ResourceNotFound | UnauthorizedUser,
  { neurofunctionalRecord: NeurofunctionalRecord }
>;

export class DenyPendingAuthorizationUseCase {
  constructor(private readonly recordRepository: NeurofunctionalRecordRepository) {}

  async execute(
    req: denyPendingAuthorizationRequest,
  ): Promise<denyPendingAuthorizationResponse> {
    const { recordType, userId, currentUserId } = req;
    switch (recordType) {
      case 'Neurofunctional':
        const neurofunctionalRecord =
          await this.recordRepository.findByPatientId(currentUserId);

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

        await this.recordRepository.removePendingAuthorization(
          neurofunctionalRecord,
          userId,
        );

        return right({ neurofunctionalRecord });
      // case 'Trauma':
      // case 'Cardio':
      default:
        return left(new ResourceNotFound('Record Type'));
    }
  }
}
