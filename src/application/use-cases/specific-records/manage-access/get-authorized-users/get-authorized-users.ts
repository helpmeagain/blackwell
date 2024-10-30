import { Either, right } from '@error/either';
import { NeurofunctionalRecordRepository } from '@/application/repositories/neurofunctional-record-repository';
import { PatientRepository } from '@/application/repositories/patient-repository';
import { ClinicianRepository } from '@/application/repositories/clinician-repository';
import { GetAuthorizedUsersResponse } from './get-authorized-users-response';
import { CardiorespiratoryRecordRepository } from '@/application/repositories/cardiorespiratory-record-repository';
import { TraumaOrthopedicRecordRepository } from '@/application/repositories/trauma-orthopedic-record-repository';

interface getAuthorizedUsersRequest {
  currentUserId: string;
}

type getAuthorizedUsersResponse = Either<
  null,
  { authorizedUsers: GetAuthorizedUsersResponse[] }
>;

export class GetAuthorizedUsersUseCase {
  constructor(
    private readonly neuroRepository: NeurofunctionalRecordRepository,
    private readonly traumaRepository: TraumaOrthopedicRecordRepository,
    private readonly cardioRepository: CardiorespiratoryRecordRepository,
    private readonly patientRepository: PatientRepository,
    private readonly clinicianRepository: ClinicianRepository,
  ) {}

  async execute(
    req: getAuthorizedUsersRequest,
  ): Promise<getAuthorizedUsersResponse> {
    const { currentUserId } = req;

    const neuroRecord = await this.neuroRepository.findByPatientId(currentUserId);
    const cardioRecord = await this.cardioRepository.findByPatientId(currentUserId);
    const traumaRecord = await this.traumaRepository.findByPatientId(currentUserId);

    
    const neuroAuthorizedUsers = neuroRecord
      ? await this.processAuthorizedUsers(
          neuroRecord.authorizedUsers ?? [],
          'Neurofunctional',
        )
      : [];

    const traumaAuthorizedUsers = traumaRecord
      ? await this.processAuthorizedUsers(
          traumaRecord.authorizedUsers ?? [],
          'Trauma',
        )
      : [];

    const cardioAuthorizedUsers = cardioRecord
      ? await this.processAuthorizedUsers(
          cardioRecord.authorizedUsers ?? [],
          'Cardio',
        )
      : [];

    const authorizedUsers = [
      ...neuroAuthorizedUsers,
      ...traumaAuthorizedUsers,
      ...cardioAuthorizedUsers,
    ];

    return right({ authorizedUsers });
  }

  private async processAuthorizedUsers(
    userIds: string[],
    recordType: 'Neurofunctional' | 'Trauma' | 'Cardio',
  ): Promise<GetAuthorizedUsersResponse[]> {
    return Promise.all(
      userIds.map(async (userId) => {
        const patient = await this.patientRepository.findById(userId);
        if (patient) {
          return {
            recordType,
            userId,
            name: patient.name,
            surname: patient.surname,
            role: 'Patient',
          };
        }

        const clinician = await this.clinicianRepository.findById(userId);
        if (clinician) {
          return {
            recordType,
            userId,
            name: clinician.name,
            surname: clinician.surname,
            role: 'Clinician',
          };
        }

        return {
          recordType,
          userId,
          name: 'Unknown',
          surname: 'Unknown',
          role: 'Unknown',
        };
      }),
    );
  }
}
