import ClinicalCare from "../../entities/clinicalConsultation";

interface scheduleClinicalConsultationRequest {
    clinicianId: string;
    patientId: string;
    appointmentDate: Date;
}

class scheduleClinicalConsultation {
    execute({clinicianId, patientId, appointmentDate}: scheduleClinicalConsultationRequest){
        const clinicalCare = new ClinicalCare(appointmentDate)
        return clinicalCare;
    }
}

export default scheduleClinicalConsultation;