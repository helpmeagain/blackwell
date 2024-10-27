import { Either, left, right } from '@error/either';
import { ResourceNotFound } from '@error/errors/resource-not-found';
import { NeurofunctionalRecord } from '@/domain/entities/specific-records/neurofunctional-record';
import { NeurofunctionalRecordRepository } from '@/application/repositories/neurofunctional-record-repository';
import { UnauthorizedUser } from '@/application/common/error-handler/errors/unauthorized';
import { CardiorespiratoryRecord } from '@/domain/entities/specific-records/cardiorespiratory-record';
import { CardiorespiratoryRecordRepository } from '@/application/repositories/cardiorespiratory-record-repository';

interface denyPendingAuthorizationRequest {
  recordType: 'Neurofunctional' | 'Trauma' | 'Cardio';
  userId: string;
  currentUserId: string;
}

type denyPendingAuthorizationResponse = Either<
  ResourceNotFound | UnauthorizedUser,
  { neurofunctionalRecord: NeurofunctionalRecord } |
  { cardiorespiratoryRecord: CardiorespiratoryRecord }
>;

export class DenyPendingAuthorizationUseCase {
  constructor(
    private readonly neuroRepository: NeurofunctionalRecordRepository,
    private readonly cardioRepository: CardiorespiratoryRecordRepository
  ) {}

  async execute(
    req: denyPendingAuthorizationRequest,
  ): Promise<denyPendingAuthorizationResponse> {
    const { recordType, userId, currentUserId } = req;
    switch (recordType) {
      case 'Neurofunctional':
        return await this.handleNeurofunctionalRequest(userId, currentUserId)
      // case 'Trauma':
        // return await this.handleTraumaRequest(userId, currentUserId)
      case 'Cardio':
        return await this.handleCardiorespiratoryRequest(userId, currentUserId)
      default:
        return left(new ResourceNotFound('Record Type'));
    }
  }

  private async handleNeurofunctionalRequest(userId: string, currentUserId: string): Promise<denyPendingAuthorizationResponse> {
    const neurofunctionalRecord = await this.neuroRepository.findByPatientId(currentUserId);

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

    await this.neuroRepository.removePendingAuthorization(
      neurofunctionalRecord,
      userId,
    );

    return right({ neurofunctionalRecord });
  }

  private async handleCardiorespiratoryRequest(userId: string, currentUserId: string): Promise<denyPendingAuthorizationResponse> {
    const cardiorespiratoryRecord = await this.cardioRepository.findByPatientId(currentUserId);

    if (!cardiorespiratoryRecord) {
      return left(new ResourceNotFound('Cardiorespiratory Record'));
    }

    if (
      !cardiorespiratoryRecord.pendingAuthorizationUsers ||
      !cardiorespiratoryRecord.pendingAuthorizationUsers.includes(userId)
    ) {
      return left(new ResourceNotFound('User'));
    }

    if (cardiorespiratoryRecord.patientId.toString() !== currentUserId) {
      return left(new UnauthorizedUser());
    }

    await this.cardioRepository.removePendingAuthorization(
      cardiorespiratoryRecord,
      userId,
    );

    return right({ cardiorespiratoryRecord });
  }
}
