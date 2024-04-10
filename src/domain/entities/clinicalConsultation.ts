import { randomUUID } from "node:crypto";

class clinicalConsultation {
    public id: string;
    public clinicianId: string;
    public patientId: string;
    public appointmentDate: Date;

    constructor (clinicianId: string, patientId: string, appointmentDate: Date, id?: string) {
        this.id = id ?? randomUUID();
        this.clinicianId = clinicianId;
        this.patientId = patientId;
        this.appointmentDate = appointmentDate;
    }
}

export default clinicalConsultation;