import ClinicalCare from "../../entities/clinicalConsultation";
import ClinicalConsultationRepository from "../../repositories/ClinicalConsultationRepository";

interface scheduleClinicalConsultationRequest {
    clinicianId: string;
    patientId: string;
    appointmentDate: Date;
}

class scheduleClinicalConsultation {

    constructor(
        private readonly clinicalCareRepository: ClinicalConsultationRepository
    ) {}

    async execute({clinicianId, patientId, appointmentDate}: scheduleClinicalConsultationRequest){
        const clinicalCare = new ClinicalCare({
            clinicianId, 
            patientId, 
            appointmentDate
        })

        await this.clinicalCareRepository.create(clinicalCare);
        return clinicalCare;
    }
}

export default scheduleClinicalConsultation;