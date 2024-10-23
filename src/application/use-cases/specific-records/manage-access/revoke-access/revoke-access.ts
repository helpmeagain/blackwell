import { Either, left, right } from '@error/either';
import { ResourceNotFound } from '@error/errors/resource-not-found';
import { NeurofunctionalRecord } from '@/domain/entities/specific-records/neurofunctional-record';
import { NeurofunctionalRecordRepository } from '@/application/repositories/neurofunctional-record-repository';
import { UnauthorizedUser } from '@/application/common/error-handler/errors/unauthorized';

interface revokeAccessRequest {
  recordType: 'Neurofunctional' | 'Trauma' | 'Cardio';
  userId: string;
  currentUserId: string;
}

type revokeAccessResponse = Either<
  ResourceNotFound | UnauthorizedUser,
  { neurofunctionalRecord: NeurofunctionalRecord }
>;

export class RevokeAccessUseCase {
  constructor(private readonly neuroRepository: NeurofunctionalRecordRepository) {}

  async execute(req: revokeAccessRequest): Promise<revokeAccessResponse> {
    const { recordType, userId, currentUserId } = req;
    switch (recordType) {
      case 'Neurofunctional':
        const neurofunctionalRecord =
          await this.neuroRepository.findByPatientId(currentUserId);

        if (!neurofunctionalRecord) {
          return left(new ResourceNotFound('Neurofunctional Record'));
        }

        if (
          !neurofunctionalRecord.authorizedUsers ||
          !neurofunctionalRecord.authorizedUsers.includes(userId)
        ) {
          return left(new ResourceNotFound('User'));
        }

        await this.neuroRepository.removeAccess(neurofunctionalRecord, userId);

        return right({ neurofunctionalRecord });
      // case 'Trauma':
      // case 'Cardio':
      default:
        return left(new ResourceNotFound('Record Type'));
    }
  }
}
