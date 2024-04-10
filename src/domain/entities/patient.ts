import { randomUUID } from "node:crypto";

interface PatientProps {
    name: string;
    surname: string;
}

class Patient {
    public id: string;
    public name: string;
    public surname: string;

    constructor (props: PatientProps , id?: string ) {
        this.name = props.name;
        this.surname = props.surname;
        this.id = id ?? randomUUID();
    }
}

export default Patient;