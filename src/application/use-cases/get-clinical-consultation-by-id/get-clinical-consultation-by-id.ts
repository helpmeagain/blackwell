import { ClinicalConsultation } from '@entities/clinical-consultation';
import { type ClinicalConsultationRepository } from '@/application/repositories/clinical-consultation-repository';
import { UniqueEntityId } from '@/domain/value-objects/unique-entity-id/unique-entity-id';

interface getClinicalConsultationByIdRequest {
  id: UniqueEntityId;
}

interface getClinicalConsultationByIdResponse {
  clinicalConsultation: ClinicalConsultation;
}

export class GetClinicalConsultationById {
  constructor(
    private readonly clinicalConsultationRepository: ClinicalConsultationRepository,
  ) {}

  async execute({
    id,
  }: getClinicalConsultationByIdRequest): Promise<getClinicalConsultationByIdResponse> {
    const clinicalConsultation = await this.clinicalConsultationRepository.findById(id);

    if (!clinicalConsultation) {
      throw new Error('Clinical consultation not found');
    }

    return { clinicalConsultation };
  }
}
