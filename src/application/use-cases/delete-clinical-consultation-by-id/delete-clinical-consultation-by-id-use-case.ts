import { type ClinicalConsultationRepository } from '@/application/repositories/clinical-consultation-repository';

interface deleteClinicalConsultationByIdRequest {
  clinicalConsultationId: string;
  clinicianId: string;
}

interface deleteClinicalConsultationByIdResponse {}

export class DeleteClinicalConsultationByIdUseCase {
  constructor(private readonly repository: ClinicalConsultationRepository) {}

  async execute({
    clinicalConsultationId,
    clinicianId,
  }: deleteClinicalConsultationByIdRequest): Promise<deleteClinicalConsultationByIdResponse> {
    const clinicalConsultation = await this.repository.findById(clinicalConsultationId);

    if (!clinicalConsultation) {
      throw new Error('Clinical consultation not found');
    }

    if (clinicianId !== clinicalConsultation.clinicianId.toString()) {
      throw new Error('Unauthorized');
    }

    await this.repository.delete(clinicalConsultation);
    return {};
  }
}
