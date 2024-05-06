import { UniqueEntityId } from '@domain/value-objects/unique-entity-id/unique-entity-id';
import { Optional } from '../common/types/optional-type';
import { Gender } from '../common/types/gender-type';
import { Slug } from '../value-objects/slug/slug';
import { AggregateRoot } from '../common/aggregate-root';
import { MedicalRecord } from './medical-record';

export interface PatientProps {
  name: string;
  surname: string;
  slug: Slug;
  gender: Gender;
  birthDate: Date;
  phoneNumber: string;
  email: string;
  password: string;
  medicalRecord?: MedicalRecord;
  createdAt: Date;
  updatedAt?: Date | null;
}

export class Patient extends AggregateRoot<PatientProps> {
  static create(
    props: Optional<PatientProps, 'createdAt' | 'slug'>,
    id?: UniqueEntityId,
  ) {
    const patient = new Patient(
      {
        ...props,
        slug: Slug.createFromText(props.name + ' ' + props.surname),
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );

    // Transform into domain event?
    patient.medicalRecord = MedicalRecord.create({ patientId: patient.id });
    return patient;
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  get name(): string {
    return this.props.name;
  }

  set name(name: string) {
    this.props.name = name;
    this.props.slug = Slug.createFromText(name + ' ' + this.surname);
    this.touch();
  }

  get surname(): string {
    return this.props.surname;
  }

  set surname(surname: string) {
    this.props.surname = surname;
    this.props.slug = Slug.createFromText(this.name + ' ' + this.surname);
    this.touch();
  }

  get slug(): Slug {
    return this.props.slug;
  }

  get gender(): Gender {
    return this.props.gender;
  }

  set gender(gender: Gender) {
    this.props.gender = gender;
    this.touch();
  }

  get birthDate(): Date {
    return this.props.birthDate;
  }

  set birthDate(birthDate: Date) {
    this.props.birthDate = birthDate;
    this.touch();
  }

  get phoneNumber(): string {
    return this.props.phoneNumber;
  }

  set phoneNumber(phoneNumber: string) {
    this.props.phoneNumber = phoneNumber;
    this.touch();
  }

  get email(): string {
    return this.props.email;
  }

  set email(email: string) {
    this.props.email = email;
    this.touch();
  }

  get password(): string {
    return this.props.password;
  }

  set password(password: string) {
    this.props.password = password;
    this.touch();
  }

  get medicalRecord(): MedicalRecord {
    return this.props.medicalRecord as MedicalRecord;
  }

  set medicalRecord(medicalRecord: MedicalRecord) {
    this.props.medicalRecord = medicalRecord;
    this.touch();
  }
}
