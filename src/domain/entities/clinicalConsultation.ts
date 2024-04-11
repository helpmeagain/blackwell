import baseEntity from "./common/baseEntity";
import uniqueEntityId from "./valueObjects/uniqueEntityId/uniqueEntityId";

interface clinicalConsultationProps {
    clinicianId: uniqueEntityId;
    patientId: uniqueEntityId;
    room: number;
    appointmentDate: Date;
    createdAt: Date;
    updatedAt?: Date;
}

class ClinicalConsultation extends baseEntity<clinicalConsultationProps> {
    get appointmentDate() {
        return this.props.appointmentDate;
    }
}

export default ClinicalConsultation;