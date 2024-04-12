import { ClinicalConsultation } from '@entities/clinical-consultation';
import { type ClinicalConsultationRepository } from '@/application/repositories/clinical-consultation-repository';
import { UniqueEntityId } from '@/domain/value-objects/unique-entity-id/unique-entity-id';

interface getClinicalConsultationByIdRequest {
  clinicalConsultationId: UniqueEntityId;
}

interface getClinicalConsultationByIdResponse {
  clinicalConsultation: ClinicalConsultation;
}

export class GetClinicalConsultationById {
  constructor(
    private readonly clinicalConsultationRepository: ClinicalConsultationRepository,
  ) {}

  async execute({
    clinicalConsultationId,
  }: getClinicalConsultationByIdRequest): Promise<getClinicalConsultationByIdResponse> {
    const clinicalConsultation =
      await this.clinicalConsultationRepository.findById(clinicalConsultationId);

    if (!clinicalConsultation) {
      throw new Error('Clinical consultation not found');
    }

    return { clinicalConsultation };
  }
}
