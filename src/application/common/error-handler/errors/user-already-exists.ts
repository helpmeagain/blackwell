import { UseCaseError } from '../use-case-error';

export class UserAlreadyExists extends Error implements UseCaseError {
  constructor(field: string, identifier: string) {
    super(`The user with ${field} '${identifier}' already exists.`);
  }
}
