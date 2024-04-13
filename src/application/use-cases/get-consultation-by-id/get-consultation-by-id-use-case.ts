import { Consultation } from '@entities/consultation';
import { type ConsultationRepository } from '@application/repositories/consultation-repository';

interface getConsultationByIdRequest {
  consultationId: string;
}

interface getConsultationByIdResponse {
  consultation: Consultation;
}

export class GetConsultationByIdUseCase {
  constructor(private readonly repository: ConsultationRepository) {}

  async execute({
    consultationId,
  }: getConsultationByIdRequest): Promise<getConsultationByIdResponse> {
    const consultation = await this.repository.findById(consultationId);

    if (!consultation) {
      throw new Error('Consultation not found');
    }

    return { consultation };
  }
}
