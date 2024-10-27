import { SpecificMedicalRecordProps } from './specific-medical-record';
import { SpecificMedicalRecord } from './specific-medical-record';
import { UniqueEntityId } from '@/domain/value-objects/unique-entity-id/unique-entity-id';
import { Optional } from '@/domain/common/types/optional-type';

export interface TraumaOrthopedicRecordProps extends SpecificMedicalRecordProps {
  palpation: string;
  edema: boolean;
  pittingTest: boolean;
  fingerPressureTest: boolean;
  perimetry: {
    rightArm: number;
    leftArm: number;
    upperRightThigh: number;
    upperLeftThigh: number;
    lowerRightThigh: number;
    lowerLeftThigh: number;
    rightKnee: number;
    leftKnee: number;
  };
  subjectivePainAssessment: {
    intensity: number;
    location: string;
    characteristic: string;
  };
  specialOrthopedicTest: string;
}

export class TraumaOrthopedicRecord extends SpecificMedicalRecord<TraumaOrthopedicRecordProps> {
  static create(
    props: Optional<
    TraumaOrthopedicRecordProps,
      | 'physiotherapyDepartment'
      | 'createdAt'
      | 'authorizedUsers'
      | 'pendingAuthorizationUsers'
    >,
    id?: UniqueEntityId,
  ) {
    const traumaorthopedicRecord = new TraumaOrthopedicRecord(
      {
        ...props,
        physiotherapyDepartment: 'Orthopedic',
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );
    return traumaorthopedicRecord;
  }

  get palpation(): string {
    return this.props.palpation;
  }

  set palpation(value: string) {
    this.props.palpation = value;
    this.touch();
  }

  get edema(): boolean {
    return this.props.edema;
  }

  set edema(value: boolean) {
    this.props.edema = value;
    this.touch();
  }

  get pittingTest(): boolean {
    return this.props.pittingTest;
  }

  set pittingTest(value: boolean) {
    this.props.pittingTest = value;
    this.touch();
  }

  get fingerPressureTest(): boolean {
    return this.props.fingerPressureTest;
  }

  set fingerPressureTest(value: boolean) {
    this.props.fingerPressureTest = value;
    this.touch();
  }

  get perimetry() {
    return this.props.perimetry;
  }

  set perimetry(value: TraumaOrthopedicRecordProps['perimetry']) {
    this.props.perimetry = value;
    this.touch();
  }

  get subjectivePainAssessment() {
    return this.props.subjectivePainAssessment;
  }

  set subjectivePainAssessment(value: TraumaOrthopedicRecordProps['subjectivePainAssessment']) {
    this.props.subjectivePainAssessment = value;
    this.touch();
  }

  get specialOrthopedicTest(): string {
    return this.props.specialOrthopedicTest;
  }

  set specialOrthopedicTest(value: string) {
    this.props.specialOrthopedicTest = value;
    this.touch();
  }
}