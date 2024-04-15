import { Consultation } from '@entities/consultation';
import { type ConsultationRepository } from '@application/repositories/consultation-repository';
import { Either, left, right } from '@/application/common/error-handler/either';
import { ResourceNotFound } from '@/application/common/error-handler/errors/resource-not-found';

interface getConsultationByIdRequest {
  consultationId: string;
}

type getConsultationByIdResponse = Either<
  ResourceNotFound,
  { consultation: Consultation }
>;

export class GetConsultationByIdUseCase {
  constructor(private readonly repository: ConsultationRepository) {}

  async execute({
    consultationId,
  }: getConsultationByIdRequest): Promise<getConsultationByIdResponse> {
    const consultation = await this.repository.findById(consultationId);

    if (!consultation) {
      return left(new ResourceNotFound());
    }

    return right({ consultation });
  }
}
