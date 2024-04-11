import baseEntity from "./common/baseEntity";
import uniqueEntityId from "./valueObjects/uniqueEntityId/uniqueEntityId";

interface PatientProps {
    name: string;
    surname: string;
}

class Patient extends baseEntity<PatientProps> {
    static create (props: PatientProps, id?: uniqueEntityId) {
        const patient = new Patient(props, id);
        return patient;
    }
}

export default Patient;