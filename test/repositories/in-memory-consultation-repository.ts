import { ClinicalConsultation } from '@entities/clinical-consultation';
import { ClinicalConsultationRepository } from '@application/repositories/clinical-consultation-repository';
import { UniqueEntityId } from '@/domain/value-objects/unique-entity-id/unique-entity-id';

export class InMemoryConsultationRepository implements ClinicalConsultationRepository {
  public items: ClinicalConsultation[] = [];

  async create(clinicalConsultation: ClinicalConsultation) {
    this.items.push(clinicalConsultation);
  }

  async findById(id: UniqueEntityId) {
    const clinicalConsultation = this.items.find((item) => item.id === id);

    if (!clinicalConsultation) {
      return null;
    }

    return clinicalConsultation;
  }
}
