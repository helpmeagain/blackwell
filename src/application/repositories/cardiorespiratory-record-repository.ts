import { CardiorespiratoryRecord } from '@/domain/entities/specific-records/cardiorespiratory-record';
import { PaginationParams } from '../common/pagination-params';

export abstract class CardiorespiratoryRecordRepository {
  abstract findById: (id: string) => Promise<CardiorespiratoryRecord | null>;
  abstract findByPatientId: (patientId: string) => Promise<CardiorespiratoryRecord | null>;
  abstract findManyByClinicianId: (
    clinicianId: string,
    params: PaginationParams,
  ) => Promise<CardiorespiratoryRecord[]>;
  abstract create: (cardiorespiratoryRecord: CardiorespiratoryRecord) => Promise<void>;
  abstract save: (cardiorespiratoryRecord: CardiorespiratoryRecord) => Promise<void>;
}