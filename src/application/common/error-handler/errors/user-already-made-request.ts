import { UseCaseError } from '../use-case-error';

export class UserAlreadyMadeRequest extends Error implements UseCaseError {
  constructor(field: string, identifier: string, authorized: boolean) {
    super(
      `The user with ${field} '${identifier}' already made a request for authorization${
        authorized ? ' and is authorized.' : '.'
      }`,
    );
  }
}
