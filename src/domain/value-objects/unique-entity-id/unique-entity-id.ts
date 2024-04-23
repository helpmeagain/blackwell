import { randomUUID } from 'node:crypto';

export class UniqueEntityId {
  private readonly value: string;

  constructor(value?: string) {
    this.value = value ?? randomUUID();
  }

  equals(id: UniqueEntityId): boolean {
    return id.toValue() === this.value;
  }

  toString(): string {
    return this.value;
  }

  toValue(): string {
    return this.value;
  }
}
