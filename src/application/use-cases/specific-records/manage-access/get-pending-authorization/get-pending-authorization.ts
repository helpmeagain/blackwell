import { Either, right } from '@error/either';
import { NeurofunctionalRecordRepository } from '@/application/repositories/neurofunctional-record-repository';
import { PatientRepository } from '@/application/repositories/patient-repository';
import { ClinicianRepository } from '@/application/repositories/clinician-repository';
import { GetPendingAuthorizationUsersResponse } from './get-pending-authorization-response';
// import { TraumaRecordRepository } from '@/application/repositories/trauma-record-repository';
// import { CardioRecordRepository } from '@/application/repositories/cardio-record-repository';

interface getPendingAuthorizationUsersRequest {
  currentUserId: string;
}

type getPendingAuthorizationUsersResponse = Either<
  null,
  { pendingAuthorizationUsers: GetPendingAuthorizationUsersResponse[] }
>;

export class GetPendingAuthorizationUsersUseCase {
  constructor(
    private readonly neuroRepository: NeurofunctionalRecordRepository,
    // private readonly traumaRepository: TraumaRecordRepository,
    // private readonly cardioRepository: CardioRecordRepository,
    private readonly patientRepository: PatientRepository,
    private readonly clinicianRepository: ClinicianRepository,
  ) {}

  async execute(
    req: getPendingAuthorizationUsersRequest,
  ): Promise<getPendingAuthorizationUsersResponse> {
    const { currentUserId } = req;

    // Verifica Neurofunctional
    const neuroRecord = await this.neuroRepository.findByPatientId(currentUserId);

    // const traumaRecord = await this.traumaRepository.findByPatientId(currentUserId);

    // const cardioRecord = await this.cardioRepository.findByPatientId(currentUserId);

    const neuroPendingUsers = neuroRecord
      ? await this.processPendingUsers(
          neuroRecord.pendingAuthorizationUsers ?? [],
          'Neurofunctional',
        )
      : [];

    // const traumaPendingUsers = traumaRecord
    //   ? await this.processPendingUsers(
    //       traumaRecord.pendingAuthorizationUsers ?? [],
    //       'Trauma',
    //     )
    //   : [];

    // const cardioPendingUsers = cardioRecord
    //   ? await this.processPendingUsers(
    //       cardioRecord.pendingAuthorizationUsers ?? [],
    //       'Cardio',
    //     )
    //   : [];

    const pendingAuthorizationUsers = [
      ...neuroPendingUsers,
      // ...traumaPendingUsers,
      // ...cardioPendingUsers,
    ];

    return right({ pendingAuthorizationUsers });
  }

  private async processPendingUsers(
    userIds: string[],
    recordType: 'Neurofunctional' | 'Trauma' | 'Cardio',
  ): Promise<GetPendingAuthorizationUsersResponse[]> {
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
