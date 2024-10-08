import { UseCaseError } from '../use-case-error';

export class UnauthorizedUser extends Error implements UseCaseError {
  constructor() {
    super(
      'Not allowed. You are not authorized to modify this resource as it belongs to another user.',
    );
  }
}
