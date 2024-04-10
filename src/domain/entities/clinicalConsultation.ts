import { randomUUID } from "node:crypto";

class clinicalConsultation {
    public id: string;
    public appointmentDate: Date;

    constructor (appointmentDate: Date, id?: string) {
        this.id = id ?? randomUUID();
        this.appointmentDate = appointmentDate;
    }
}

export default clinicalConsultation;