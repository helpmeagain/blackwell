import { Either, left, right } from '@error/either';
import { ResourceNotFound } from '@error/errors/resource-not-found';
import { TraumaOrthopedicRecord } from '@/domain/entities/specific-records/trauma-orthopedic-record';
import { TraumaOrthopedicRecordRepository } from '@/application/repositories/trauma-orthopedic-record-repository';
import { UnauthorizedUser } from '@/application/common/error-handler/errors/unauthorized';

interface getTraumaOrthopedicByPatientIdRequest {
  patientId: string;
  currentUserId: string;
}

type getTraumaOrthopedicByPatientIdResponse = Either<
  ResourceNotFound | UnauthorizedUser,
  { traumaorthopedicRecord: TraumaOrthopedicRecord }
>;

export class GetTraumaOrthopedicByPatientIdUseCase {
  constructor(private readonly repository: TraumaOrthopedicRecordRepository) {}

  async execute(
    req: getTraumaOrthopedicByPatientIdRequest,
  ): Promise<getTraumaOrthopedicByPatientIdResponse> {
    const { patientId, currentUserId } = req;
    const traumaorthopedicRecord = await this.repository.findByPatientId(patientId);

    if (!traumaorthopedicRecord) {
      return left(new ResourceNotFound());
    }

    const isNotAuthorized =
      traumaorthopedicRecord.clinicianId.toString() != currentUserId &&
      traumaorthopedicRecord.patientId.toString() != currentUserId &&
      !traumaorthopedicRecord.authorizedUsers?.includes(currentUserId);

    if (isNotAuthorized) {
      return left(new UnauthorizedUser());
    }

    return right({ traumaorthopedicRecord });
  }
}
