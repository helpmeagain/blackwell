import { Either, left, right } from '@error/either';
import { ResourceNotFound } from '@error/errors/resource-not-found';
import { NeurofunctionalRecord } from '@/domain/entities/specific-records/neurofunctional-record';
import { NeurofunctionalRecordRepository } from '@/application/repositories/neurofunctional-record-repository';
import { UnauthorizedUser } from '@/application/common/error-handler/errors/unauthorized';

interface getNeurofunctionalByIdRequest {
  id: string;
  currentUserId: string;
}

type getNeurofunctionalByIdResponse = Either<
  ResourceNotFound | UnauthorizedUser,
  { neurofunctionalRecord: NeurofunctionalRecord }
>;

export class GetNeurofunctionalByIdUseCase {
  constructor(private readonly repository: NeurofunctionalRecordRepository) {}

  async execute(
    req: getNeurofunctionalByIdRequest,
  ): Promise<getNeurofunctionalByIdResponse> {
    const { id, currentUserId } = req;
    const neurofunctionalRecord = await this.repository.findById(id);

    if (!neurofunctionalRecord) {
      return left(new ResourceNotFound());
    }

    const isNotAuthorized =
      neurofunctionalRecord.clinicianId.toString() != currentUserId &&
      neurofunctionalRecord.patientId.toString() != currentUserId &&
      !neurofunctionalRecord.authorizedUsers?.includes(currentUserId);

    if (isNotAuthorized) {
      return left(new UnauthorizedUser());
    }

    return right({ neurofunctionalRecord });
  }
}
