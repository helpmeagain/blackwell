import { type Consultation } from '@entities/consultation';
import { PaginationParams } from '../common/pagination-params';

export interface ConsultationRepository {
  findById: (id: string) => Promise<Consultation | null>;
  findManyRecent: (params: PaginationParams) => Promise<Consultation[]>;
  create: (consultation: Consultation) => Promise<void>;
  save: (consultation: Consultation) => Promise<void>;
  delete: (consultation: Consultation) => Promise<void>;
}
