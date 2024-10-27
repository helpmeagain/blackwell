import { Either, right } from '@error/either';
import { TraumaOrthopedicRecordRepository } from '@/application/repositories/trauma-orthopedic-record-repository';
import { PatientRepository } from '@/application/repositories/patient-repository';
import { FetchRecordsByClinicianIdResponse } from './fetch-records-by-clinician-id-response';

interface fetchTraumaOrthopedicByClinicianIdRequest {
  clinicianId: string;
  page?: number;
  orderBy?: {
    field: string;
    direction?: 'asc' | 'desc';
  };
}

type fetchTraumaOrthopedicByClinicianIdResponse = Either<
  null,
  { records: FetchRecordsByClinicianIdResponse[] }
>;

export class FetchTraumaOrthopedicIdsByClinicianIdUseCase {
  constructor(
    private readonly traumaorthopedicRecordRepository: TraumaOrthopedicRecordRepository,
    private readonly patientRepository: PatientRepository,
  ) {}

  async execute({
    clinicianId,
    page = 1,
    orderBy = { field: 'createdAt', direction: 'desc' },
  }: fetchTraumaOrthopedicByClinicianIdRequest): Promise<fetchTraumaOrthopedicByClinicianIdResponse> {
    const traumaorthopedicRecords =
      await this.traumaorthopedicRecordRepository.findManyByClinicianId(clinicianId, {
        page,
        orderBy: {
          field: orderBy.field ?? 'createdAt',
          direction: orderBy.direction ?? 'desc',
        },
      });

    if (!traumaorthopedicRecords || traumaorthopedicRecords.length === 0) {
      return right({ records: [] });
    }

    const records: FetchRecordsByClinicianIdResponse[] = [];

    for (const traumaRecord of traumaorthopedicRecords) {
      const patient = await this.patientRepository.findById(
        traumaRecord.patientId.toString(),
      );

      if (!patient) {
        continue;
      }

      records.push({
        patientId: traumaRecord.patientId.toString(),
        traumaOrthopedicRecordId: traumaRecord.id.toString(),
        name: patient.name,
        surname: patient.surname,
        createdAt: traumaRecord.createdAt,
        updatedAt: traumaRecord.updatedAt ?? traumaRecord.createdAt,
      });
    }

    return right({ records });
  }
}
