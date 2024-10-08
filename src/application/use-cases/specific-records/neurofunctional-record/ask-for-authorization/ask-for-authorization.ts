import { Either, left, right } from '@error/either';
import { ResourceNotFound } from '@error/errors/resource-not-found';
import { NeurofunctionalRecord } from '@/domain/entities/specific-records/neurofunctional-record';
import { NeurofunctionalRecordRepository } from '@/application/repositories/neurofunctional-record-repository';
import { PatientRepository } from '@/application/repositories/patient-repository';
import { ClinicianRepository } from '@/application/repositories/clinician-repository';

interface askForAuthorizationRequest {
  recordId: string;
  userId: string;
}

type askForAuthorizationResponse = Either<
  ResourceNotFound,
  { neurofunctionalRecord: NeurofunctionalRecord }
>;

export class AskForAuthorizationUseCase {
  constructor(
    private readonly recordRepository: NeurofunctionalRecordRepository,
    private readonly patientRepository: PatientRepository,
    private readonly clinicianRepository: ClinicianRepository,
  ) {}

  async execute(req: askForAuthorizationRequest): Promise<askForAuthorizationResponse> {
    const { recordId, userId } = req;
    const neurofunctionalRecord = await this.recordRepository.findById(recordId);

    if (!neurofunctionalRecord) {
      return left(new ResourceNotFound('Neurofunctional Record'));
    }

    const [patient, clinician] = await Promise.all([
      this.patientRepository.findById(userId),
      this.clinicianRepository.findById(userId),
    ]);

    if (!patient || !clinician) {
      return left(new ResourceNotFound('User'));
    }

    await this.recordRepository.askForAuthorization(neurofunctionalRecord, userId);

    return right({ neurofunctionalRecord });
  }
}
