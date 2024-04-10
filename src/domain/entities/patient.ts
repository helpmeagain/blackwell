import { randomUUID } from "node:crypto";

class Patient {
    public id: string;
    public name: string;
    public surname: string;

    constructor (name: string, surname: string , id?: string ) {
        this.name = name;
        this.surname = surname;
        this.id = id ?? randomUUID();
    }
}

export default Patient;