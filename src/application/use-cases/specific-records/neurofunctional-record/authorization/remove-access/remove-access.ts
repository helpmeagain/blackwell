import { Either, left, right } from '@error/either';
import { ResourceNotFound } from '@error/errors/resource-not-found';
import { NeurofunctionalRecord } from '@/domain/entities/specific-records/neurofunctional-record';
import { NeurofunctionalRecordRepository } from '@/application/repositories/neurofunctional-record-repository';
import { UnauthorizedUser } from '@/application/common/error-handler/errors/unauthorized';

interface removeAccessRequest {
  recordId: string;
  userId: string;
  currentUserId: string;
}

type removeAccessResponse = Either<
  ResourceNotFound | UnauthorizedUser,
  { neurofunctionalRecord: NeurofunctionalRecord }
>;

export class RemoveAccessUseCase {
  constructor(private readonly recordRepository: NeurofunctionalRecordRepository) {}

  async execute(req: removeAccessRequest): Promise<removeAccessResponse> {
    const { recordId, userId, currentUserId } = req;
    const neurofunctionalRecord = await this.recordRepository.findById(recordId);

    if (!neurofunctionalRecord) {
      return left(new ResourceNotFound('Neurofunctional Record'));
    }

    if (
      !neurofunctionalRecord.authorizedUsers ||
      !neurofunctionalRecord.authorizedUsers.includes(userId)
    ) {
      return left(new ResourceNotFound('User'));
    }

    if (neurofunctionalRecord.patientId.toString() !== currentUserId) {
      return left(new UnauthorizedUser());
    }

    await this.recordRepository.removeAccess(neurofunctionalRecord, userId);

    return right({ neurofunctionalRecord });
  }
}
