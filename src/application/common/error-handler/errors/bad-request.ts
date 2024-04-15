import { UseCaseError } from '../use-case-error';

export class BadRequest extends Error implements UseCaseError {
  constructor() {
    super('Bad request.');
  }
}
