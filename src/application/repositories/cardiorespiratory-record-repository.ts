import { CardiorespiratoryRecord } from '@/domain/entities/specific-records/cardiorespiratory-record';
import { PaginationParams } from '../common/pagination-params';

export abstract class CardiorespiratoryRecordRepository {
  abstract findById: (id: string) => Promise<CardiorespiratoryRecord | null>;
  abstract findAll: () => Promise<CardiorespiratoryRecord[]>;
  abstract findByPatientId: (patientId: string) => Promise<CardiorespiratoryRecord | null>;
  abstract findManyByClinicianId: (
    clinicianId: string,
    params: PaginationParams,
  ) => Promise<CardiorespiratoryRecord[]>;
  abstract askForAuthorization(
    cardiorespiratoryRecord: CardiorespiratoryRecord,
    userId: string,
  ): Promise<void>;
  abstract authorizeAccess(
    cardiorespiratoryRecord: CardiorespiratoryRecord,
    userId: string,
  ): Promise<void>;
  abstract removePendingAuthorization(
    cardiorespiratoryRecord: CardiorespiratoryRecord,
    userId: string,
  ): Promise<void>;
  abstract removeAccess(
    cardiorespiratoryRecord: CardiorespiratoryRecord,
    userId: string,
  ): Promise<void>;
  abstract create: (cardiorespiratoryRecord: CardiorespiratoryRecord) => Promise<void>;
  abstract save: (cardiorespiratoryRecord: CardiorespiratoryRecord) => Promise<void>;
}