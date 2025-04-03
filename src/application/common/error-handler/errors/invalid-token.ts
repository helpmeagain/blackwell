import { UseCaseError } from '../use-case-error';

export class InvalidToken extends Error implements UseCaseError {
  constructor() {
    super(`Token invalid or expired`);
  }
}
