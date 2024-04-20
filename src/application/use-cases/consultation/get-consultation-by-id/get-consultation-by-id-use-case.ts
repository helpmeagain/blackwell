import { Either, left, right } from '@error/either';
import { ResourceNotFound } from '@error/errors/resource-not-found';
import { Consultation } from '@entities/consultation';
import { type ConsultationRepository } from '@application/repositories/consultation-repository';

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
