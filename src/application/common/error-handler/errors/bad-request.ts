import { UseCaseError } from '../use-case-error';

export class BadRequest extends Error implements UseCaseError {
  constructor(identifier: string) {
    super(`Invalid request, field: ${identifier} is invalid.`);
  }
}
