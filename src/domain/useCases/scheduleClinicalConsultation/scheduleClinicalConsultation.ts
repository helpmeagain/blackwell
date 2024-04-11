import ClinicalConsultation from "@entities/clinicalConsultation";
import uniqueEntityId from "@entities/valueObjects/uniqueEntityId/uniqueEntityId";
import ClinicalConsultationRepository from "@/domain/repositories/ClinicalConsultationRepository";

interface scheduleClinicalConsultationRequest {
    clinicianId: string;
    patientId: string;
    room: number;
    appointmentDate: Date;
}

class scheduleClinicalConsultation {

    constructor(
        private readonly clinicalCareRepository: ClinicalConsultationRepository
    ) {}

    async execute({clinicianId, patientId, room, appointmentDate}: scheduleClinicalConsultationRequest){
        const clinicalCare = ClinicalConsultation.create({
            clinicianId: new uniqueEntityId(clinicianId),
            patientId: new uniqueEntityId(patientId), 
            room,
            appointmentDate
        })

        await this.clinicalCareRepository.create(clinicalCare);
        return clinicalCare;
    }
}

export default scheduleClinicalConsultation;