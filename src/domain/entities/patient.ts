import { UniqueEntityId } from '@domain/value-objects/unique-entity-id/unique-entity-id';
import { AggregateRoot } from '../common/aggregate-root';
import { Optional } from '../common/optional-type';

interface PatientProps {
  name: string;
  surname: string;
  birthDate: Date;
  phoneNumber: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Patient extends AggregateRoot<PatientProps> {
  static create(props: Optional<PatientProps, 'createdAt'>, id?: UniqueEntityId) {
    const patient = new Patient(
      { ...props, createdAt: props.createdAt ?? new Date() },
      id,
    );
    return patient;
  }

  // Getters //
  get name(): string {
    return this.props.name;
  }

  get surname(): string {
    return this.props.surname;
  }

  get birthDate(): Date {
    return this.props.birthDate;
  }

  get phoneNumber(): string {
    return this.props.phoneNumber;
  }

  get email(): string {
    return this.props.email;
  }

  // Setter //
  private touch() {
    this.props.updatedAt = new Date();
  }

  set name(name: string) {
    this.props.name = name;
    this.touch();
  }

  set surname(surname: string) {
    this.props.surname = surname;
    this.touch();
  }

  set phoneNumber(phoneNumber: string) {
    this.props.phoneNumber = phoneNumber;
    this.touch();
  }

  set email(email: string) {
    this.props.email = email;
    this.touch();
  }
}
