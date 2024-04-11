import baseEntity from "./common/baseEntity";

interface PatientProps {
    name: string;
    surname: string;
}

class Patient extends baseEntity<PatientProps> {

}

export default Patient;