import { Either, left, right } from '@error/either';
import { ResourceNotFound } from '@error/errors/resource-not-found';
import { NeurofunctionalRecord } from '@/domain/entities/specific-records/neurofunctional-record';
import { NeurofunctionalRecordRepository } from '@/application/repositories/neurofunctional-record-repository';
import { UnauthorizedUser } from '@/application/common/error-handler/errors/unauthorized';
import { CardiorespiratoryRecord } from '@/domain/entities/specific-records/cardiorespiratory-record';
import { CardiorespiratoryRecordRepository } from '@/application/repositories/cardiorespiratory-record-repository';

interface revokeAccessRequest {
  recordType: 'Neurofunctional' | 'Trauma' | 'Cardio';
  userId: string;
  currentUserId: string;
}

type revokeAccessResponse = Either<
  ResourceNotFound | UnauthorizedUser,
  { neurofunctionalRecord: NeurofunctionalRecord } |
  { cardiorespiratoryRecord: CardiorespiratoryRecord }
>;

export class RevokeAccessUseCase {
  constructor(
    private readonly neuroRepository: NeurofunctionalRecordRepository,
    private readonly cardioRepository: CardiorespiratoryRecordRepository
  ) {}

  async execute(req: revokeAccessRequest): Promise<revokeAccessResponse> {
    const { recordType, userId, currentUserId } = req;
    switch (recordType) {
      case 'Neurofunctional':
        return await this.handleNeurofunctionalRequest(userId, currentUserId)
      // case 'Trauma':
      case 'Cardio':
        return await this.handleCardiorespiratoryRequest(userId, currentUserId)
      default:
        return left(new ResourceNotFound('Record Type'));
    }
  }

  private async handleNeurofunctionalRequest(userId: string, currentUserId: string): Promise<revokeAccessResponse> {
    const neurofunctionalRecord = await this.neuroRepository.findByPatientId(currentUserId);

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
  }

  private async handleCardiorespiratoryRequest(userId: string, currentUserId: string): Promise<revokeAccessResponse> {
    const cardiorespiratoryRecord = await this.cardioRepository.findByPatientId(currentUserId);

    if (!cardiorespiratoryRecord) {
      return left(new ResourceNotFound('Neurofunctional Record'));
    }

    if (
      !cardiorespiratoryRecord.authorizedUsers ||
      !cardiorespiratoryRecord.authorizedUsers.includes(userId)
    ) {
      return left(new ResourceNotFound('User'));
    }

    await this.cardioRepository.removeAccess(cardiorespiratoryRecord, userId);

    return right({ cardiorespiratoryRecord });
  }
}
