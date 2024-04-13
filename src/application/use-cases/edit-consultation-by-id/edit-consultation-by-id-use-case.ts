import { Consultation } from '@entities/consultation';
import { type ConsultationRepository } from '@application/repositories/consultation-repository';

interface editConsultationByIdRequest {
  consultationId: string;
  clinicianId: string;
  appointmentDate: Date;
  room: number;
}

interface editConsultationByIdResponse {
  consultation: Consultation;
}

export class EditConsultationByIdUseCase {
  constructor(private readonly repository: ConsultationRepository) {}

  async execute({
    consultationId,
    clinicianId,
    appointmentDate,
    room,
  }: editConsultationByIdRequest): Promise<editConsultationByIdResponse> {
    const consultation = await this.repository.findById(consultationId);

    if (!consultation) {
      throw new Error('Consultation not found');
    }

    if (clinicianId !== consultation.clinicianId.toString()) {
      throw new Error('Unauthorized');
    }

    consultation.appointmentDate = appointmentDate;
    consultation.room = room;

    await this.repository.save(consultation);
    return { consultation };
  }
}
