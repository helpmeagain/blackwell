import { ClinicalConsultation } from '@entities/clinical-consultation';
import { ClinicalConsultationRepository } from '@application/repositories/clinical-consultation-repository';

export class InMemoryConsultationRepository implements ClinicalConsultationRepository {
  public items: ClinicalConsultation[] = [];

  async findById(id: string) {
    const clinicalConsultation = this.items.find((item) => item.id.toString() === id);

    if (!clinicalConsultation) {
      return null;
    }

    return clinicalConsultation;
  }

  async create(clinicalConsultation: ClinicalConsultation) {
    this.items.push(clinicalConsultation);
  }

  async delete(clinicalConsultation: ClinicalConsultation) {
    const index = this.items.findIndex((item) => item.id === clinicalConsultation.id);
    this.items.splice(index, 1);
  }
}
