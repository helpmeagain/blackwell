import { Either, right } from '@error/either';
import { CardiorespiratoryRecordRepository } from '@/application/repositories/cardiorespiratory-record-repository';
import { PatientRepository } from '@/application/repositories/patient-repository';
import { FetchRecordsByClinicianIdResponse } from './fetch-records-by-clinician-id-response';

interface fetchCardiorespiratoryByClinicianIdRequest {
  clinicianId: string;
  page?: number;
  orderBy?: {
    field: string;
    direction?: 'asc' | 'desc';
  };
}

type fetchCardiorespiratoryByClinicianIdResponse = Either<
  null,
  { records: FetchRecordsByClinicianIdResponse[] }
>;

export class FetchCardiorespiratoryIdsByClinicianIdUseCase {
  constructor(
    private readonly cardiorespiratoryRecordRepository: CardiorespiratoryRecordRepository,
    private readonly patientRepository: PatientRepository,
  ) {}

  async execute({
    clinicianId,
    page = 1,
    orderBy = { field: 'createdAt', direction: 'desc' },
  }: fetchCardiorespiratoryByClinicianIdRequest): Promise<fetchCardiorespiratoryByClinicianIdResponse> {
    const cardiorespiratoryRecords =
      await this.cardiorespiratoryRecordRepository.findManyByClinicianId(clinicianId, {
        page,
        orderBy: {
          field: orderBy.field ?? 'createdAt',
          direction: orderBy.direction ?? 'desc',
        },
      });

    if (!cardiorespiratoryRecords || cardiorespiratoryRecords.length === 0) {
      return right({ records: [] });
    }

    const records: FetchRecordsByClinicianIdResponse[] = [];

    for (const cardioRecord of cardiorespiratoryRecords) {
      const patient = await this.patientRepository.findById(
        cardioRecord.patientId.toString(),
      );

      if (!patient) {
        continue;
      }

      records.push({
        patientId: cardioRecord.patientId.toString(),
        cardiorespiratoryRecordId: cardioRecord.id.toString(),
        name: patient.name,
        surname: patient.surname,
        createdAt: cardioRecord.createdAt,
        updatedAt: cardioRecord.updatedAt ?? cardioRecord.createdAt,
      });
    }

    return right({ records });
  }
}
