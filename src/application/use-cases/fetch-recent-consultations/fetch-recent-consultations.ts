import { Consultation } from '@entities/consultation';
import { type ConsultationRepository } from '@application/repositories/consultation-repository';

interface fetchRecentConsultationRequest {
  page: number;
}

interface fetchRecentConsultationResponse {
  consultations: Consultation[];
}

export class FetchRecentConsultationUseCase {
  constructor(private readonly repository: ConsultationRepository) {}

  async execute({
    page,
  }: fetchRecentConsultationRequest): Promise<fetchRecentConsultationResponse> {
    const consultations = await this.repository.findManyRecent({ page });

    return { consultations };
  }
}
