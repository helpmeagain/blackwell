import { Either, left, right } from '@error/either';
import { ResourceNotFound } from '@error/errors/resource-not-found';
import { NeurofunctionalRecord } from '@/domain/entities/specific-records/neurofunctional-record';
import { NeurofunctionalRecordRepository } from '@/application/repositories/neurofunctional-record-repository';
import { PatientRepository } from '@/application/repositories/patient-repository';
import { ClinicianRepository } from '@/application/repositories/clinician-repository';
import { UserAlreadyMadeRequest } from '@/application/common/error-handler/errors/user-already-made-request';
import { CardiorespiratoryRecordRepository } from '@/application/repositories/cardiorespiratory-record-repository';
import { CardiorespiratoryRecord } from '@/domain/entities/specific-records/cardiorespiratory-record';
import { TraumaOrthopedicRecord } from '@/domain/entities/specific-records/trauma-orthopedic-record';
import { TraumaOrthopedicRecordRepository } from '@/application/repositories/trauma-orthopedic-record-repository';

interface requestAccessRequest {
  recordType: 'Neurofunctional' | 'Trauma' | 'Cardio';
  patientId: string;
  userId: string;
}

type requestAccessResponse = Either<
  ResourceNotFound | UserAlreadyMadeRequest,
  { neurofunctionalRecord: NeurofunctionalRecord } | 
  { cardiorespiratoryRecord: CardiorespiratoryRecord } |
  { traumaOrthopedicRecord: TraumaOrthopedicRecord }
>;

export class RequestAccessUseCaseByPatientId {
  constructor(
    private readonly neuroRepository: NeurofunctionalRecordRepository,
    private readonly cardioRepository: CardiorespiratoryRecordRepository,
    private readonly traumaRepository: TraumaOrthopedicRecordRepository,
    private readonly patientRepository: PatientRepository,
    private readonly clinicianRepository: ClinicianRepository,
  ) {}

  async execute(req: requestAccessRequest): Promise<requestAccessResponse> {
    const { recordType, patientId, userId } = req;
    switch (recordType) {
      case 'Neurofunctional':
        return await this.handleNeurofunctionalRequest(patientId, userId);
      case 'Cardio':
        return await this.handleCardiorespiratoryRequest(patientId, userId);
      case 'Trauma':
        return await this.handleTraumaOrthopedicRequest(patientId, userId);
      default:
        return left(new ResourceNotFound('Record Type'));
    }
  }

  private async handleNeurofunctionalRequest(patientId: string, userId: string): Promise<requestAccessResponse> {
    const neurofunctionalRecord = await this.neuroRepository.findByPatientId(patientId);

    if (!neurofunctionalRecord) {
      return left(new ResourceNotFound('Neurofunctional Record'));
    }

    if (neurofunctionalRecord.pendingAuthorizationUsers?.includes(userId)) {
      return left(new UserAlreadyMadeRequest('id', userId, false));
    }

    if (neurofunctionalRecord.authorizedUsers?.includes(userId)) {
      return left(new UserAlreadyMadeRequest('id', userId, true));
    }

    const [patient, clinician] = await Promise.all([
      this.patientRepository.findById(userId),
      this.clinicianRepository.findById(userId),
    ]);

    if (!patient && !clinician) {
      return left(new ResourceNotFound('User'));
    }

    await this.neuroRepository.askForAuthorization(neurofunctionalRecord, userId);

    return right({ neurofunctionalRecord });
  }

  private async handleCardiorespiratoryRequest(patientId: string, userId: string): Promise<requestAccessResponse> {
    const cardiorespiratoryRecord = await this.cardioRepository.findByPatientId(patientId);

    if (!cardiorespiratoryRecord) {
      return left(new ResourceNotFound('Cardiorespiratory Record'));
    }

    if (cardiorespiratoryRecord.pendingAuthorizationUsers?.includes(userId)) {
      return left(new UserAlreadyMadeRequest('id', userId, false));
    }

    if (cardiorespiratoryRecord.authorizedUsers?.includes(userId)) {
      return left(new UserAlreadyMadeRequest('id', userId, true));
    }

    const [patient, clinician] = await Promise.all([
      this.patientRepository.findById(userId),
      this.clinicianRepository.findById(userId),
    ]);

    if (!patient && !clinician) {
      return left(new ResourceNotFound('User'));
    }

    await this.cardioRepository.askForAuthorization(cardiorespiratoryRecord, userId);

    return right({ cardiorespiratoryRecord });
  }

  private async handleTraumaOrthopedicRequest(patientId: string, userId: string): Promise<requestAccessResponse> {
    const traumaOrthopedicRecord = await this.traumaRepository.findByPatientId(patientId);

    if (!traumaOrthopedicRecord) {
      return left(new ResourceNotFound('Cardiorespiratory Record'));
    }

    if (traumaOrthopedicRecord.pendingAuthorizationUsers?.includes(userId)) {
      return left(new UserAlreadyMadeRequest('id', userId, false));
    }

    if (traumaOrthopedicRecord.authorizedUsers?.includes(userId)) {
      return left(new UserAlreadyMadeRequest('id', userId, true));
    }

    const [patient, clinician] = await Promise.all([
      this.patientRepository.findById(userId),
      this.clinicianRepository.findById(userId),
    ]);

    if (!patient && !clinician) {
      return left(new ResourceNotFound('User'));
    }

    await this.traumaRepository.askForAuthorization(traumaOrthopedicRecord, userId);

    return right({ traumaOrthopedicRecord });
  }
}
