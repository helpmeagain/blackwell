import { ClinicalConsultation } from '@entities/clinical-consultation';
import { UniqueEntityId } from '@domain/value-objects/unique-entity-id/unique-entity-id';
import { type ClinicalConsultationRepository } from '@/application/repositories/clinical-consultation-repository';

interface scheduleClinicalConsultationRequest {
  clinicianId: string;
  patientId: string;
  room: number;
  appointmentDate: Date;
}

export class ScheduleClinicalConsultation {
  constructor(
    private readonly clinicalCareRepository: ClinicalConsultationRepository,
  ) {}

  async execute({
    clinicianId,
    patientId,
    room,
    appointmentDate,
  }: scheduleClinicalConsultationRequest) {
    const clinicalCare = ClinicalConsultation.create({
      clinicianId: new UniqueEntityId(clinicianId),
      patientId: new UniqueEntityId(patientId),
      room,
      appointmentDate,
    });

    await this.clinicalCareRepository.create(clinicalCare);
    return clinicalCare;
  }
}
