import { randomUUID } from "node:crypto";

interface ClinicianProps {
    name: string;
    surname: string;
}

class Clinician {
    public id: string;
    public name: string;
    public surname: string;

    constructor (props: ClinicianProps, id?: string ) {
        this.name = props.name;
        this.surname = props.surname;
        this.id = id ?? randomUUID();
    }
}

export default Clinician;