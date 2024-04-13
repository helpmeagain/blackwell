import { Consultation } from '@/domain/entities/consultation';
import { ConsultationRepository } from '@/application/repositories/consultation-repository';

export class InMemoryConsultationRepository implements ConsultationRepository {
  public items: Consultation[] = [];

  async findById(id: string) {
    const consultation = this.items.find((item) => item.id.toString() === id);

    if (!consultation) {
      return null;
    }

    return consultation;
  }

  async create(consultation: Consultation) {
    this.items.push(consultation);
  }

  async delete(consultation: Consultation) {
    const index = this.items.findIndex((item) => item.id === consultation.id);
    this.items.splice(index, 1);
  }
}
