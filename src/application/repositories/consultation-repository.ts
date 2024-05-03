import { type Consultation } from '@entities/consultation';
import { PaginationParams } from '../common/pagination-params';

export abstract class ConsultationRepository {
  abstract findById: (id: string) => Promise<Consultation | null>;
  abstract findManyRecent: (params: PaginationParams) => Promise<Consultation[]>;
  abstract create: (consultation: Consultation) => Promise<void>;
  abstract save: (consultation: Consultation) => Promise<void>;
  abstract delete: (consultation: Consultation) => Promise<void>;
}
