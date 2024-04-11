import baseEntity from "./common/baseEntity";

interface ClinicianProps {
    name: string;
    surname: string;
}

class Clinician extends baseEntity<ClinicianProps> {

}

export default Clinician;