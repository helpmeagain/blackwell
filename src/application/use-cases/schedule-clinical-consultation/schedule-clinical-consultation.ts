import { ClinicalConsultation } from '@entities/clinical-consultation';
import { UniqueEntityId } from '@domain/value-objects/unique-entity-id/unique-entity-id';
import { type ClinicalConsultationRepository } from '@/application/repositories/clinical-consultation-repository';

interface scheduleClinicalConsultationRequest {
  clinicianId: string;
  patientId: string;
  room: number;
  appointmentDate: Date;
}

interface scheduleClinicalConsultationResponse {
  clinicalConsultation: ClinicalConsultation;
}

export class ScheduleClinicalConsultation {
  constructor(
    private readonly clinicalConsultationRepository: ClinicalConsultationRepository,
  ) {}

  async execute({
    clinicianId,
    patientId,
    room,
    appointmentDate,
  }: scheduleClinicalConsultationRequest): Promise<scheduleClinicalConsultationResponse> {
    const clinicalConsultation = ClinicalConsultation.create({
      clinicianId: new UniqueEntityId(clinicianId),
      patientId: new UniqueEntityId(patientId),
      room,
      appointmentDate,
    });

    await this.clinicalConsultationRepository.create(clinicalConsultation);
    return { clinicalConsultation };
  }
}
