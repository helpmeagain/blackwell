import type ClinicalConsultation from '../entities/clinicalConsultation';

interface ClinicalConsultationRepository {
  create: (clinicalConsultation: ClinicalConsultation) => Promise<void>;
}

export default ClinicalConsultationRepository;
