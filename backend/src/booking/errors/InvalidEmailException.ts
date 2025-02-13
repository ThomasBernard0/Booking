import { CustomError } from './CustomError';

export class InvalidEmailException extends CustomError {
  constructor(email: string) {
    super(`The email address "${email}" is not valid.`);
  }
}
