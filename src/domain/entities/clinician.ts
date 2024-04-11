import baseEntity from "./common/baseEntity";
import uniqueEntityId from "./valueObjects/uniqueEntityId/uniqueEntityId";

interface ClinicianProps {
    name: string;
    surname: string;
    occupation: string;
}

class Clinician extends baseEntity<ClinicianProps> {
    static create (props: ClinicianProps, id?: uniqueEntityId) {
        const clinician = new Clinician(props, id);
        return clinician;
    }
}

export default Clinician;