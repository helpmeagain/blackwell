import { ClinicalConsultation } from '@entities/clinical-consultation';
import { ClinicalConsultationRepository } from '@application/repositories/clinical-consultation-repository';

export class InMemoryConsultationRepository implements ClinicalConsultationRepository {
  public items: ClinicalConsultation[] = [];

  async create(clinicalConsultation: ClinicalConsultation) {
    this.items.push(clinicalConsultation);
  }
}
