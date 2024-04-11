import { type ClinicalConsultation } from '@/domain/entities/clinical-consultation';

export interface ClinicalConsultationRepository {
  create: (clinicalConsultation: ClinicalConsultation) => Promise<void>;
}
