import { Either, left, right } from '@error/either';
import { ResourceNotFound } from '@error/errors/resource-not-found';
import { NeurofunctionalRecord } from '@/domain/entities/specific-records/neurofunctional-record';
import { NeurofunctionalRecordRepository } from '@/application/repositories/neurofunctional-record-repository';
import { PatientRepository } from '@/application/repositories/patient-repository';
import { ClinicianRepository } from '@/application/repositories/clinician-repository';

interface authorizeAccessRequest {
  recordId: string;
  userId: string;
}

type authorizeAccessResponse = Either<
  ResourceNotFound,
  { neurofunctionalRecord: NeurofunctionalRecord }
>;

export class AuthorizeAccessUseCase {
  constructor(
    private readonly recordRepository: NeurofunctionalRecordRepository,
    private readonly patientRepository: PatientRepository,
    private readonly clinicianRepository: ClinicianRepository,
  ) {}

  async execute(req: authorizeAccessRequest): Promise<authorizeAccessResponse> {
    const { recordId, userId } = req;
    const neurofunctionalRecord = await this.recordRepository.findById(recordId);

    if (!neurofunctionalRecord) {
      return left(new ResourceNotFound('Neurofunctional Record'));
    }

    if (
      !neurofunctionalRecord.pendingAuthorizationUsers ||
      !neurofunctionalRecord.pendingAuthorizationUsers.includes(userId)
    ) {
      return left(new ResourceNotFound('User'));
    }

    await this.recordRepository.authorizeAccess(neurofunctionalRecord, userId);

    return right({ neurofunctionalRecord });
  }
}
