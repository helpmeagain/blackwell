import { Consultation } from '@/domain/entities/consultation';
import { ConsultationRepository } from '@/application/repositories/consultation-repository';
import { PaginationParams } from '@/application/common/pagination-params';
import { DomainEvents } from '@/domain/common/events/domain-events';
import { PatientRepository } from '@/application/repositories/patient-repository';

export class InMemoryConsultationRepository implements ConsultationRepository {
  public items: Consultation[] = [];

  constructor(private PatientRepository: PatientRepository) {}

  async findById(id: string) {
    const consultation = this.items.find((item) => item.id.toString() === id);

    if (!consultation) {
      return null;
    }

    return consultation;
  }

  async findManyRecent({ page }: PaginationParams) {
    const consultations = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20);

    return consultations;
  }

  async create(consultation: Consultation) {
    this.items.push(consultation);
    await this.PatientRepository.saveConsultationOnRecord(consultation);
    DomainEvents.dispatchEventsForAggregate(consultation.id);
  }

  async save(consultation: Consultation) {
    const index = this.items.findIndex((item) => item.id === consultation.id);
    this.items[index] = consultation;

    DomainEvents.dispatchEventsForAggregate(consultation.id);
  }

  async delete(consultation: Consultation) {
    const index = this.items.findIndex((item) => item.id === consultation.id);
    await this.PatientRepository.removeConsultationOnRecord(consultation);
    this.items.splice(index, 1);
  }
}
