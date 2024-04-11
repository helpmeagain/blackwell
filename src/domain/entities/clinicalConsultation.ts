import baseEntity from "./common/baseEntity";
import { Optional } from "./common/optionalType";
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
    static create (props: Optional<clinicalConsultationProps, 'createdAt'>, id?: uniqueEntityId) {
        const clinicalConsultation = new ClinicalConsultation({
            ...props,
            createdAt: new Date(),
        }, id);
        return clinicalConsultation;
    }

    get appointmentDate() {
        return this.props.appointmentDate;
    }

}

export default ClinicalConsultation;