import { Either, left, right } from '@error/either';
import { ResourceNotFound } from '@error/errors/resource-not-found';
import { NeurofunctionalRecord } from '@/domain/entities/specific-records/neurofunctional-record';
import { NeurofunctionalRecordRepository } from '@/application/repositories/neurofunctional-record-repository';
import { UnauthorizedUser } from '@/application/common/error-handler/errors/unauthorized';

interface getNeurofunctionalByPatientIdRequest {
  patientId: string;
  currentUserId: string;
}

type getNeurofunctionalByPatientIdResponse = Either<
  ResourceNotFound | UnauthorizedUser,
  { neurofunctionalRecord: NeurofunctionalRecord }
>;

export class GetNeurofunctionalByPatientIdUseCase {
  constructor(private readonly repository: NeurofunctionalRecordRepository) {}

  async execute(
    req: getNeurofunctionalByPatientIdRequest,
  ): Promise<getNeurofunctionalByPatientIdResponse> {
    const { patientId, currentUserId } = req;
    const neurofunctionalRecord = await this.repository.findByPatientId(patientId);

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
