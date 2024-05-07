import { UseCaseError } from '../use-case-error';

export class WrongCredentials extends Error implements UseCaseError {
  constructor() {
    super(`Credentials are invalid.`);
  }
}
