import { Either, left, right } from '@error/either';
import { ResourceNotFound } from '@error/errors/resource-not-found';
import { NeurofunctionalRecord } from '@/domain/entities/specific-records/neurofunctional-record';
import { NeurofunctionalRecordRepository } from '@/application/repositories/neurofunctional-record-repository';
import { UnauthorizedUser } from '@/application/common/error-handler/errors/unauthorized';

interface authorizeAccessRequest {
  recordType: 'Neurofunctional' | 'Trauma' | 'Cardio';
  userId: string;
  currentUserId: string;
}

type authorizeAccessResponse = Either<
  ResourceNotFound | UnauthorizedUser,
  { neurofunctionalRecord: NeurofunctionalRecord }
>;

export class AuthorizeAccessUseCase {
  constructor(private readonly neuroRepository: NeurofunctionalRecordRepository) {}

  async execute(req: authorizeAccessRequest): Promise<authorizeAccessResponse> {
    const { recordType, userId, currentUserId } = req;
    switch (recordType) {
      case 'Neurofunctional':
        const neuroRecord = await this.neuroRepository.findByPatientId(currentUserId);

        if (!neuroRecord) {
          return left(new ResourceNotFound('Neurofunctional Record'));
        }

        if (
          !neuroRecord.pendingAuthorizationUsers ||
          !neuroRecord.pendingAuthorizationUsers.includes(userId)
        ) {
          return left(new ResourceNotFound('User'));
        }

        if (neuroRecord.patientId.toString() !== currentUserId) {
          return left(new UnauthorizedUser());
        }

        await this.neuroRepository.authorizeAccess(neuroRecord, userId);

        return right({ neurofunctionalRecord: neuroRecord });
      // case 'Trauma':
      // case 'Cardio':
      default:
        return left(new ResourceNotFound('Record Type'));
    }
  }
}
