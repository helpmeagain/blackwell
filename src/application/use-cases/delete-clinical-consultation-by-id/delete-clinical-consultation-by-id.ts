import { type ClinicalConsultationRepository } from '@/application/repositories/clinical-consultation-repository';

interface deleteClinicalConsultationByIdRequest {
  clinicalConsultationId: string;
  clinicianId: string;
}

interface deleteClinicalConsultationByIdResponse {}

export class DeleteClinicalConsultationById {
  constructor(
    private readonly clinicalConsultationRepository: ClinicalConsultationRepository,
  ) {}

  async execute({
    clinicalConsultationId,
    clinicianId,
  }: deleteClinicalConsultationByIdRequest): Promise<deleteClinicalConsultationByIdResponse> {
    const clinicalConsultation =
      await this.clinicalConsultationRepository.findById(clinicalConsultationId);

    if (!clinicalConsultation) {
      throw new Error('Clinical consultation not found');
    }

    if (clinicianId !== clinicalConsultation.clinicianId.toString()) {
      throw new Error('Unauthorized');
    }

    await this.clinicalConsultationRepository.delete(clinicalConsultation);
    return { clinicalConsultation };
  }
}
