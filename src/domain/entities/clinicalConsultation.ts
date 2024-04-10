import { randomUUID } from "node:crypto";

interface clinicalConsultationProps {
    clinicianId: string;
    patientId: string;
    appointmentDate: Date;
}

class clinicalConsultation {
    public id: string;
    public clinicianId: string;
    public patientId: string;
    public appointmentDate: Date;

    constructor (props: clinicalConsultationProps, id?: string) {
        this.id = id ?? randomUUID();
        this.clinicianId = props.clinicianId;
        this.patientId = props.patientId;
        this.appointmentDate = props.appointmentDate;
    }
}

export default clinicalConsultation;