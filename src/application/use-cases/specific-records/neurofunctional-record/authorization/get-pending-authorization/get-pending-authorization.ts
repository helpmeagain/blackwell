import { Either, left, right } from '@error/either';
import { ResourceNotFound } from '@error/errors/resource-not-found';
import { NeurofunctionalRecordRepository } from '@/application/repositories/neurofunctional-record-repository';
import { UnauthorizedUser } from '@/application/common/error-handler/errors/unauthorized';
import { PatientRepository } from '@/application/repositories/patient-repository';
import { ClinicianRepository } from '@/application/repositories/clinician-repository';
import { GetPendingAuthorizationUsersResponse } from './get-pending-authorization-response';

interface getPendingAuthorizationUsersRequest {
  id: string;
  currentUserId: string;
}

type getPendingAuthorizationUsersResponse = Either<
  ResourceNotFound | UnauthorizedUser,
  { pendingAuthorizationUsers: GetPendingAuthorizationUsersResponse[] }
>;

export class GetPendingAuthorizationUsersUseCase {
  constructor(
    private readonly recordRepository: NeurofunctionalRecordRepository,
    private readonly patientRepository: PatientRepository,
    private readonly clinicianRepository: ClinicianRepository,
  ) {}

  async execute(
    req: getPendingAuthorizationUsersRequest,
  ): Promise<getPendingAuthorizationUsersResponse> {
    const { id, currentUserId } = req;
    const neurofunctionalRecord = await this.recordRepository.findById(id);

    if (!neurofunctionalRecord) {
      return left(new ResourceNotFound());
    }

    if (neurofunctionalRecord.patientId.toString() !== currentUserId) {
      return left(new UnauthorizedUser());
    }

    const authorizationUsers = neurofunctionalRecord.pendingAuthorizationUsers ?? [];

    const pendingAuthorizationUsers = await Promise.all(
      authorizationUsers.map(async (userId) => {
        const patient = await this.patientRepository.findById(userId);
        if (patient) {
          return {
            userId,
            name: patient.name,
            surname: patient.surname,
            role: 'Patient',
          };
        }

        const clinician = await this.clinicianRepository.findById(userId);
        if (clinician) {
          return {
            userId,
            name: clinician.name,
            surname: clinician.surname,
            role: 'Clinician',
          };
        }

        return {
          userId,
          name: 'Unknown',
          surname: 'Unknown',
          role: 'Unknown',
        };
      }),
    );

    return right({ pendingAuthorizationUsers });
  }
}
