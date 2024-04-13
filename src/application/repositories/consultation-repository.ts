import { type Consultation } from '@entities/consultation';

export interface ConsultationRepository {
  findById: (id: string) => Promise<Consultation | null>;
  create: (consultation: Consultation) => Promise<void>;
  save: (consultation: Consultation) => Promise<void>;
  delete: (consultation: Consultation) => Promise<void>;
}
