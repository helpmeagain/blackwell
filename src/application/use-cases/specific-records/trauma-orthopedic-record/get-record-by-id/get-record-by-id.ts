import { Either, left, right } from '@error/either';
import { ResourceNotFound } from '@error/errors/resource-not-found';
import { TraumaOrthopedicRecord } from '@/domain/entities/specific-records/trauma-orthopedic-record';
import { TraumaOrthopedicRecordRepository } from '@/application/repositories/trauma-orthopedic-record-repository';
import { UnauthorizedUser } from '@/application/common/error-handler/errors/unauthorized';

interface getTraumaOrthopedicByIdRequest {
  id: string;
  currentUserId: string;
}

type getTraumaOrthopedicByIdResponse = Either<
  ResourceNotFound | UnauthorizedUser,
  { traumaorthopedicRecord: TraumaOrthopedicRecord }
>;

export class GetTraumaOrthopedicByIdUseCase {
  constructor(private readonly repository: TraumaOrthopedicRecordRepository) {}

  async execute(
    req: getTraumaOrthopedicByIdRequest,
  ): Promise<getTraumaOrthopedicByIdResponse> {
    const { id, currentUserId } = req;
    const traumaorthopedicRecord = await this.repository.findById(id);

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
