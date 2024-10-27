import { Either, left, right } from '@error/either';
import { ResourceNotFound } from '@error/errors/resource-not-found';
import { CardiorespiratoryRecord } from '@/domain/entities/specific-records/cardiorespiratory-record';
import { CardiorespiratoryRecordRepository } from '@/application/repositories/cardiorespiratory-record-repository';
import { UnauthorizedUser } from '@/application/common/error-handler/errors/unauthorized';

interface getCardiorespiratoryByPatientIdRequest {
  patientId: string;
  currentUserId: string;
}

type getCardiorespiratoryByPatientIdResponse = Either<
  ResourceNotFound | UnauthorizedUser,
  { cardiorespiratoryRecord: CardiorespiratoryRecord }
>;

export class GetCardiorespiratoryByPatientIdUseCase {
  constructor(private readonly repository: CardiorespiratoryRecordRepository) {}

  async execute(
    req: getCardiorespiratoryByPatientIdRequest,
  ): Promise<getCardiorespiratoryByPatientIdResponse> {
    const { patientId, currentUserId } = req;
    const cardiorespiratoryRecord = await this.repository.findByPatientId(patientId);

    if (!cardiorespiratoryRecord) {
      return left(new ResourceNotFound());
    }

    const isNotAuthorized =
      cardiorespiratoryRecord.clinicianId.toString() != currentUserId &&
      cardiorespiratoryRecord.patientId.toString() != currentUserId &&
      !cardiorespiratoryRecord.authorizedUsers?.includes(currentUserId);

    if (isNotAuthorized) {
      return left(new UnauthorizedUser());
    }

    return right({ cardiorespiratoryRecord });
  }
}
