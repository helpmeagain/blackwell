import { NotAllowed } from '@/application/common/error-handler/errors/not-allowed';
import { ResourceNotFound } from '@/application/common/error-handler/errors/resource-not-found';
import { Either, left, right } from '@application/common/error-handler/either';
import { type ConsultationRepository } from '@application/repositories/consultation-repository';

interface deleteConsultationByIdRequest {
  consultationId: string;
  clinicianId: string;
}

type deleteConsultationByIdResponse = Either<
  ResourceNotFound | NotAllowed,
  Record<string, never>
>;

export class DeleteConsultationByIdUseCase {
  constructor(private readonly repository: ConsultationRepository) {}

  async execute({
    consultationId,
    clinicianId,
  }: deleteConsultationByIdRequest): Promise<deleteConsultationByIdResponse> {
    const consultation = await this.repository.findById(consultationId);

    if (!consultation) {
      return left(new ResourceNotFound());
    }

    if (clinicianId !== consultation.clinicianId.toString()) {
      return left(new NotAllowed());
    }

    await this.repository.delete(consultation);
    return right({});
  }
}
