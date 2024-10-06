import { Either, right } from '@error/either';
import { NeurofunctionalRecordRepository } from '@/application/repositories/neurofunctional-record-repository';
import { PatientRepository } from '@/application/repositories/patient-repository';
import { FetchRecordsByClinicianIdResponse } from './fetch-records-by-clinician-id-response';

interface fetchNeurofunctionalByClinicianIdRequest {
  clinicianId: string;
  page?: number;
  orderBy?: {
    field: string;
    direction?: 'asc' | 'desc';
  };
}

type fetchNeurofunctionalByClinicianIdResponse = Either<
  null,
  { records: FetchRecordsByClinicianIdResponse[] }
>;

export class FetchNeurofunctionalIdsByClinicianIdUseCase {
  constructor(
    private readonly neurofunctionalRecordRepository: NeurofunctionalRecordRepository,
    private readonly patientRepository: PatientRepository,
  ) {}

  async execute({
    clinicianId,
    page = 1,
    orderBy = { field: 'createdAt', direction: 'desc' },
  }: fetchNeurofunctionalByClinicianIdRequest): Promise<fetchNeurofunctionalByClinicianIdResponse> {
    const neurofunctionalRecords =
      await this.neurofunctionalRecordRepository.findManyByClinicianId(clinicianId, {
        page,
        orderBy: {
          field: orderBy.field ?? 'createdAt',
          direction: orderBy.direction ?? 'desc',
        },
      });

    if (!neurofunctionalRecords || neurofunctionalRecords.length === 0) {
      return right({ records: [] });
    }

    const records: FetchRecordsByClinicianIdResponse[] = [];

    for (const neuroRecord of neurofunctionalRecords) {
      const patient = await this.patientRepository.findById(
        neuroRecord.patientId.toString(),
      );

      if (!patient) {
        continue;
      }

      records.push({
        patientId: neuroRecord.patientId.toString(),
        neurofunctionalRecordId: neuroRecord.id.toString(),
        name: patient.name,
        surname: patient.surname,
        createdAt: neuroRecord.createdAt,
        updatedAt: neuroRecord.updatedAt ?? neuroRecord.createdAt,
      });
    }

    return right({ records });
  }
}
