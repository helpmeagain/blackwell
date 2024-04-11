import ClinicalConsultation from '@entities/clinicalConsultation';
import UniqueEntityId from '@entities/valueObjects/uniqueEntityId/uniqueEntityId';
import type ClinicalConsultationRepository from '@application/repositories/ClinicalConsultationRepository';

interface scheduleClinicalConsultationRequest {
  clinicianId: string;
  patientId: string;
  room: number;
  appointmentDate: Date;
}

class ScheduleClinicalConsultation {
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

export default ScheduleClinicalConsultation;
