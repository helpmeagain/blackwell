import { ClinicalConsultation } from '@entities/clinical-consultation';
import { type ClinicalConsultationRepository } from '@/application/repositories/clinical-consultation-repository';

interface getClinicalConsultationByIdRequest {
  clinicalConsultationId: string;
}

interface getClinicalConsultationByIdResponse {
  clinicalConsultation: ClinicalConsultation;
}

export class GetClinicalConsultationByIdUseCase {
  constructor(private readonly repository: ClinicalConsultationRepository) {}

  async execute({
    clinicalConsultationId,
  }: getClinicalConsultationByIdRequest): Promise<getClinicalConsultationByIdResponse> {
    const clinicalConsultation = await this.repository.findById(clinicalConsultationId);

    if (!clinicalConsultation) {
      throw new Error('Clinical consultation not found');
    }

    return { clinicalConsultation };
  }
}
