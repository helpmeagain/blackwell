import { Either, left, right } from '@error/either';
import { ResourceNotFound } from '@error/errors/resource-not-found';
import { NeurofunctionalRecord } from '@/domain/entities/specific-records/neurofunctional-record';
import { NeurofunctionalRecordRepository } from '@/application/repositories/neurofunctional-record-repository';
import { UnauthorizedUser } from '@/application/common/error-handler/errors/unauthorized';
import { CardiorespiratoryRecord } from '@/domain/entities/specific-records/cardiorespiratory-record';
import { CardiorespiratoryRecordRepository } from '@/application/repositories/cardiorespiratory-record-repository';
import { TraumaOrthopedicRecord } from '@/domain/entities/specific-records/trauma-orthopedic-record';
import { TraumaOrthopedicRecordRepository } from '@/application/repositories/trauma-orthopedic-record-repository';

interface denyPendingAuthorizationRequest {
  recordType: 'Neurofunctional' | 'Trauma' | 'Cardio';
  userId: string;
  currentUserId: string;
}

type denyPendingAuthorizationResponse = Either<
  ResourceNotFound | UnauthorizedUser,
  { neurofunctionalRecord: NeurofunctionalRecord } |
  { cardiorespiratoryRecord: CardiorespiratoryRecord } |
  { traumaOrthopedicRecord: TraumaOrthopedicRecord }
>;

export class DenyPendingAuthorizationUseCase {
  constructor(
    private readonly neuroRepository: NeurofunctionalRecordRepository,
    private readonly cardioRepository: CardiorespiratoryRecordRepository,
    private readonly traumaRepository: TraumaOrthopedicRecordRepository,
  ) {}

  async execute(
    req: denyPendingAuthorizationRequest,
  ): Promise<denyPendingAuthorizationResponse> {
    const { recordType, userId, currentUserId } = req;
    switch (recordType) {
      case 'Neurofunctional':
        return await this.handleNeurofunctionalRequest(userId, currentUserId)
      case 'Trauma':
        return await this.handleTraumaOrthopedicRequest(userId, currentUserId)
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

  private async handleTraumaOrthopedicRequest(userId: string, currentUserId: string): Promise<denyPendingAuthorizationResponse> {
    const traumaOrthopedicRecord = await this.traumaRepository.findByPatientId(currentUserId);

    if (!traumaOrthopedicRecord) {
      return left(new ResourceNotFound('Cardiorespiratory Record'));
    }

    if (
      !traumaOrthopedicRecord.pendingAuthorizationUsers ||
      !traumaOrthopedicRecord.pendingAuthorizationUsers.includes(userId)
    ) {
      return left(new ResourceNotFound('User'));
    }

    if (traumaOrthopedicRecord.patientId.toString() !== currentUserId) {
      return left(new UnauthorizedUser());
    }

    await this.traumaRepository.removePendingAuthorization(
      traumaOrthopedicRecord,
      userId,
    );

    return right({ traumaOrthopedicRecord });
  }
}
