import { Consultation } from '@entities/consultation';
import { UniqueEntityId } from '@domain/value-objects/unique-entity-id/unique-entity-id';
import { type ConsultationRepository } from '@/application/repositories/consultation-repository';

interface createConsultationRequest {
  clinicianId: string;
  patientId: string;
  room: number;
  appointmentDate: Date;
}

interface createConsultationResponse {
  consultation: Consultation;
}

export class CreateConsultationUseCase {
  constructor(private readonly repository: ConsultationRepository) {}

  async execute({
    clinicianId,
    patientId,
    room,
    appointmentDate,
  }: createConsultationRequest): Promise<createConsultationResponse> {
    const consultation = Consultation.create({
      clinicianId: new UniqueEntityId(clinicianId),
      patientId: new UniqueEntityId(patientId),
      room,
      appointmentDate,
    });

    await this.repository.create(consultation);
    return { consultation };
  }
}
