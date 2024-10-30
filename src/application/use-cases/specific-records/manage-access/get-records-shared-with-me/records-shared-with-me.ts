import { Either, right } from '@error/either';
import { NeurofunctionalRecordRepository } from '@/application/repositories/neurofunctional-record-repository';
import { CardiorespiratoryRecordRepository } from '@/application/repositories/cardiorespiratory-record-repository';
import { TraumaOrthopedicRecordRepository } from '@/application/repositories/trauma-orthopedic-record-repository';
import { PatientRepository } from '@/application/repositories/patient-repository';

interface GetRecordsSharedWithMeRequest {
  currentUserId: string;
}

type SharedRecord = {
  recordType: 'Neurofunctional' | 'Trauma' | 'Cardio';
  recordId: string;
  patientId: string;
  name: string;
  surname: string;
};

type GetRecordsSharedWithMeResponse = Either<null, { recordsSharedWithMe: SharedRecord[] }>;

export class GetRecordsSharedWithMeUseCase {
  constructor(
    private readonly neuroRepository: NeurofunctionalRecordRepository,
    private readonly cardioRepository: CardiorespiratoryRecordRepository,
    private readonly traumaRepository: TraumaOrthopedicRecordRepository,
    private readonly patientRepository: PatientRepository,
  ) {}

  async execute(
    req: GetRecordsSharedWithMeRequest,
  ): Promise<GetRecordsSharedWithMeResponse> {
    const { currentUserId } = req;

    const neuroRecords = await this.neuroRepository.findAll();
    const cardioRecords = await this.cardioRepository.findAll();
    const traumaRecords = await this.traumaRepository.findAll();

    const mapRecordWithPatientData = async (record, recordType: 'Neurofunctional' | 'Trauma' | 'Cardio'): Promise<SharedRecord | null> => {
      const patient = await this.patientRepository.findById(record.patientId.toString());
      if (!patient) return null;

      return {
        recordType,
        recordId: record.id.toString(),
        patientId: record.patientId.toString(),
        name: patient.name,
        surname: patient.surname,
      };
    };

    const neuroRecordsSharedWithMe = await Promise.all(
      neuroRecords
        .filter(record => record.authorizedUsers?.includes(currentUserId))
        .map(record => mapRecordWithPatientData(record, 'Neurofunctional'))
    );

    const cardioRecordsSharedWithMe = await Promise.all(
      cardioRecords
        .filter(record => record.authorizedUsers?.includes(currentUserId))
        .map(record => mapRecordWithPatientData(record, 'Cardio'))
    );

    const traumaRecordsSharedWithMe = await Promise.all(
      traumaRecords
        .filter(record => record.authorizedUsers?.includes(currentUserId))
        .map(record => mapRecordWithPatientData(record, 'Trauma'))
    );

    const recordsSharedWithMe: SharedRecord[] = [
      ...neuroRecordsSharedWithMe,
      ...cardioRecordsSharedWithMe,
      ...traumaRecordsSharedWithMe,
    ].filter(record => record !== null);

    return right({ recordsSharedWithMe });
  }
}
