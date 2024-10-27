import { TraumaOrthopedicRecord } from "@/domain/entities/specific-records/trauma-orthopedic-record";
import { PaginationParams } from '../common/pagination-params';

export abstract class TraumaOrthopedicRecordRepository {
  abstract findById: (id: string) => Promise<TraumaOrthopedicRecord | null>;
  abstract findByPatientId: (patientId: string) => Promise<TraumaOrthopedicRecord | null>;
  abstract findByUniversalRecordId: (
    universalRecordId: string,
  ) => Promise<TraumaOrthopedicRecord | null>;
  abstract findManyByClinicianId: (
    clinicianId: string,
    params: PaginationParams,
  ) => Promise<TraumaOrthopedicRecord[]>;
  abstract askForAuthorization(
    traumaorthopedicRecord: TraumaOrthopedicRecord,
    userId: string,
  ): Promise<void>;
  abstract authorizeAccess(
    traumaorthopedicRecord: TraumaOrthopedicRecord,
    userId: string,
  ): Promise<void>;
  abstract removePendingAuthorization(
    traumaorthopedicRecord: TraumaOrthopedicRecord,
    userId: string,
  ): Promise<void>;
  abstract removeAccess(
    traumaorthopedicRecord: TraumaOrthopedicRecord,
    userId: string,
  ): Promise<void>;
  abstract create: (traumaorthopedicRecord: TraumaOrthopedicRecord) => Promise<void>;
  abstract save: (traumaorthopedicRecord: TraumaOrthopedicRecord) => Promise<void>;
}
