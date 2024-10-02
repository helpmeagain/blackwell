import { UniqueEntityId } from '@domain/value-objects/unique-entity-id/unique-entity-id';
import { Optional } from '../common/types/optional-type';
import { Gender } from '../common/types/gender-type';
import { Slug } from '../value-objects/slug/slug';
import { AggregateRoot } from '../common/aggregate-root';
import { UniversalMedicalRecord } from './universal-medical-record';

export interface PatientProps {
  name: string;
  surname: string;
  slug: Slug;
  gender: Gender;
  birthDate: Date;
  cpf: string;
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  email: string;
  password: string;
  universalMedicalRecord?: UniversalMedicalRecord;
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

  get cpf(): string {
    return this.props.cpf;
  }

  set cpf(cpf: string) {
    this.props.cpf = cpf;
    this.touch();
  }

  get phoneNumber(): string {
    return this.props.phoneNumber;
  }

  set phoneNumber(phoneNumber: string) {
    this.props.phoneNumber = phoneNumber;
    this.touch();
  }

  get address(): string {
    return this.props.address;
  }

  set address(address: string) {
    this.props.address = address;
    this.touch();
  }

  get city(): string {
    return this.props.city;
  }

  set city(city: string) {
    this.props.city = city;
    this.touch();
  }

  get state(): string {
    return this.props.state;
  }

  set state(state: string) {
    this.props.state = state;
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

  get universalMedicalRecord(): UniversalMedicalRecord {
    return this.props.universalMedicalRecord as UniversalMedicalRecord;
  }

  set universalMedicalRecord(universalMedicalRecord: UniversalMedicalRecord) {
    this.props.universalMedicalRecord = universalMedicalRecord;
    this.touch();
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }
}
