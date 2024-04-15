import { Consultation } from '@entities/consultation';
import { type ConsultationRepository } from '@application/repositories/consultation-repository';
import { Either, right } from '@/application/common/error-handler/either';

interface fetchRecentConsultationRequest {
  page: number;
}

type fetchRecentConsultationResponse = Either<null, { consultations: Consultation[] }>;

export class FetchRecentConsultationUseCase {
  constructor(private readonly repository: ConsultationRepository) {}

  async execute({
    page,
  }: fetchRecentConsultationRequest): Promise<fetchRecentConsultationResponse> {
    const consultations = await this.repository.findManyRecent({ page });

    return right({ consultations });
  }
}
