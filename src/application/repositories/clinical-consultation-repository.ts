import { type ClinicalConsultation } from '@/domain/entities/clinical-consultation';
import { UniqueEntityId } from '@/domain/value-objects/unique-entity-id/unique-entity-id';

export interface ClinicalConsultationRepository {
  create: (clinicalConsultation: ClinicalConsultation) => Promise<void>;
  findById: (id: UniqueEntityId) => Promise<ClinicalConsultation | null>;
}
