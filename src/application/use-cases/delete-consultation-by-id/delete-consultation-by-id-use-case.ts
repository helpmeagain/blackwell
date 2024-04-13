import { type ConsultationRepository } from '@application/repositories/consultation-repository';

interface deleteConsultationByIdRequest {
  consultationId: string;
  clinicianId: string;
}

interface deleteConsultationByIdResponse {}

export class DeleteConsultationByIdUseCase {
  constructor(private readonly repository: ConsultationRepository) {}

  async execute({
    consultationId,
    clinicianId,
  }: deleteConsultationByIdRequest): Promise<deleteConsultationByIdResponse> {
    const consultation = await this.repository.findById(consultationId);

    if (!consultation) {
      throw new Error('Consultation not found');
    }

    if (clinicianId !== consultation.clinicianId.toString()) {
      throw new Error('Unauthorized');
    }

    await this.repository.delete(consultation);
    return {};
  }
}
