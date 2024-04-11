import baseEntity from "./common/baseEntity";

interface clinicalConsultationProps {
    clinicianId: string;
    patientId: string;
    appointmentDate: Date;
}

class ClinicalConsultation extends baseEntity<clinicalConsultationProps> {
    get appointmentDate() {
        return this.props.appointmentDate;
    }
}

export default ClinicalConsultation;