import { randomUUID } from 'node:crypto';

class UniqueEntityId {
  private readonly value: string;

  constructor(value?: string) {
    this.value = value ?? randomUUID();
  }

  toString(): string {
    return this.value;
  }

  toValue(): string {
    return this.value;
  }
}

export default UniqueEntityId;
