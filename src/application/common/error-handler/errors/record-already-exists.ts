import { UseCaseError } from '../use-case-error';

export class RecordAlreadyExists extends Error implements UseCaseError {
  constructor(name: string, surname: string, recordType: string) {
    super(`The user '${name} ${surname}' already have a ${recordType} record.`);
  }
}
