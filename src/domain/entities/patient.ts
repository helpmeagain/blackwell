import baseEntity from './common/baseEntity';
import type UniqueEntityId from './valueObjects/uniqueEntityId/uniqueEntityId';

interface PatientProps {
  name: string;
  surname: string;
}

class Patient extends baseEntity<PatientProps> {
  static create(props: PatientProps, id?: UniqueEntityId) {
    const patient = new Patient(props, id);
    return patient;
  }
}

export default Patient;
