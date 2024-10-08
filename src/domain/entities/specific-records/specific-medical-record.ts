import { BaseEntity } from '@/domain/common/base-entity';
import { PhysiotherapyDepartment } from '@/domain/common/types/physiotherapy-department-type';
import { Triage } from '@/domain/common/types/triage-type';
import { UniqueEntityId } from '@/domain/value-objects/unique-entity-id/unique-entity-id';

export interface SpecificMedicalRecordProps {
  clinicianId: UniqueEntityId;
  patientId: UniqueEntityId;
  universalMedicalRecordId: UniqueEntityId;
  medicalDiagnosis: string;
  anamnesis: string;
  physicalExamination: string;
  physiotherapyDepartment: PhysiotherapyDepartment;
  triage: Triage;
  authorizedUsers?: string[];
  pendingAuthorizationUsers?: string[];
  createdAt: Date;
  updatedAt?: Date | null;
}

export class SpecificMedicalRecord<
  Props extends SpecificMedicalRecordProps,
> extends BaseEntity<Props> {
  protected touch() {
    this.props.updatedAt = new Date();
  }

  get clinicianId(): UniqueEntityId {
    return this.props.clinicianId;
  }

  get patientId(): UniqueEntityId {
    return this.props.patientId;
  }

  get universalMedicalRecordId(): UniqueEntityId {
    return this.props.universalMedicalRecordId;
  }

  get medicalDiagnosis(): string {
    return this.props.medicalDiagnosis;
  }

  set medicalDiagnosis(value: string) {
    this.props.medicalDiagnosis = value;
    this.touch();
  }

  get anamnesis(): string {
    return this.props.anamnesis;
  }

  set anamnesis(value: string) {
    this.props.anamnesis = value;
    this.touch();
  }

  get physicalExamination(): string {
    return this.props.physicalExamination;
  }

  set physicalExamination(value: string) {
    this.props.physicalExamination = value;
    this.touch();
  }

  get physiotherapyDepartment(): PhysiotherapyDepartment {
    return this.props.physiotherapyDepartment;
  }

  set physiotherapyDepartment(value: PhysiotherapyDepartment) {
    this.props.physiotherapyDepartment = value;
    this.touch();
  }

  get triage(): Triage {
    return this.props.triage;
  }

  set triage(value: Triage) {
    this.props.triage = value;
    this.touch();
  }

  get authorizedUsers(): string[] | undefined {
    return this.props.authorizedUsers;
  }

  set authorizedUsers(value: string[]) {
    this.props.authorizedUsers = value;
    this.touch();
  }

  get pendingAuthorizationUsers(): string[] | undefined {
    return this.props.pendingAuthorizationUsers;
  }

  set pendingAuthorizationUsers(value: string[]) {
    this.props.pendingAuthorizationUsers = value;
    this.touch();
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date | undefined | null {
    return this.props.updatedAt;
  }
}
