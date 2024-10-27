import { Either, left, right } from '@error/either';
import { ResourceNotFound } from '@error/errors/resource-not-found';
import { NeurofunctionalRecord } from '@/domain/entities/specific-records/neurofunctional-record';
import { NeurofunctionalRecordRepository } from '@/application/repositories/neurofunctional-record-repository';
import { UnauthorizedUser } from '@/application/common/error-handler/errors/unauthorized';
import { CardiorespiratoryRecordRepository } from '@/application/repositories/cardiorespiratory-record-repository';
import { CardiorespiratoryRecord } from '@/domain/entities/specific-records/cardiorespiratory-record';

interface authorizeAccessRequest {
  recordType: 'Neurofunctional' | 'Trauma' | 'Cardio';
  userId: string;
  currentUserId: string;
}

type authorizeAccessResponse = Either<
  ResourceNotFound | UnauthorizedUser,
  { neurofunctionalRecord: NeurofunctionalRecord } | 
  { cardiorespiratoryRecord: CardiorespiratoryRecord }
>;

export class AuthorizeAccessUseCase {
  constructor(
    private readonly neuroRepository: NeurofunctionalRecordRepository,
    private readonly cardioRepository: CardiorespiratoryRecordRepository,
  ) {}

  async execute(req: authorizeAccessRequest): Promise<authorizeAccessResponse> {
    const { recordType, userId, currentUserId } = req;
    switch (recordType) {
      case 'Neurofunctional':
        return await this.handleNeurofunctionalRequest(userId, currentUserId)
      case 'Cardio':
        return await this.handleCardiorespiratoryRequest(userId, currentUserId)
      // case 'Trauma':
      default:
        return left(new ResourceNotFound('Record Type'));
    }
  }

  private async handleNeurofunctionalRequest(userId: string, currentUserId: string): Promise<authorizeAccessResponse> {
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
  }

  private async handleCardiorespiratoryRequest(userId: string, currentUserId: string): Promise<authorizeAccessResponse> {
    const cardioRecord = await this.cardioRepository.findByPatientId(currentUserId);

    if (!cardioRecord) {
      return left(new ResourceNotFound('Neurofunctional Record'));
    }

    if (
      !cardioRecord.pendingAuthorizationUsers ||
      !cardioRecord.pendingAuthorizationUsers.includes(userId)
    ) {
      return left(new ResourceNotFound('User'));
    }

    if (cardioRecord.patientId.toString() !== currentUserId) {
      return left(new UnauthorizedUser());
    }

    await this.cardioRepository.authorizeAccess(cardioRecord, userId);

    return right({ cardiorespiratoryRecord: cardioRecord });
  }
}
