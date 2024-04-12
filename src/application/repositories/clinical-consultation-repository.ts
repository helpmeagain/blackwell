import { type ClinicalConsultation } from '@/domain/entities/clinical-consultation';

export interface ClinicalConsultationRepository {
  findById: (id: string) => Promise<ClinicalConsultation | null>;
  create: (clinicalConsultation: ClinicalConsultation) => Promise<void>;
}
