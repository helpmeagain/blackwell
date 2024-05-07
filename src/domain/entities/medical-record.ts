import { BaseEntity } from '../common/base-entity';
import { Optional } from '../common/types/optional-type';
import { UniqueEntityId } from '../value-objects/unique-entity-id/unique-entity-id';
import { ConsultationIdList } from './consultation-list';

interface MedicalRecordProps {
  patientId: UniqueEntityId;
  consultationsIds: ConsultationIdList;
  diagnosis?: string;
  comorbidity?: string;
}

export class MedicalRecord extends BaseEntity<MedicalRecordProps> {
  static create(
    props: Optional<MedicalRecordProps, 'consultationsIds' | 'diagnosis' | 'comorbidity'>,
    id?: UniqueEntityId,
  ) {
    const record = new MedicalRecord(
      { ...props, consultationsIds: props.consultationsIds ?? new ConsultationIdList() },
      id,
    );
    return record;
  }

  get patientId() {
    return this.props.patientId;
  }

  get consultationsIds() {
    return this.props.consultationsIds;
  }

  set consultationsIds(consultationsIds: ConsultationIdList) {
    this.props.consultationsIds = consultationsIds;
  }

  get diagnosis() {
    return this.props.diagnosis as string;
  }

  set diagnosis(diagnosis: string) {
    this.props.diagnosis = diagnosis;
  }

  get comorbidity() {
    return this.props.comorbidity as string;
  }

  set comorbidity(comorbidity: string) {
    this.props.comorbidity = comorbidity;
  }
}
