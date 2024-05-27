import { UseCaseError } from '../use-case-error';

export class ResourceNotFound extends Error implements UseCaseError {
  constructor(field: string = 'Resource') {
    super(`${field} not found.`);
  }
}
