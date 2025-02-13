import { CustomError } from './CustomError';

export class InvalidSessionException extends CustomError {
  constructor() {
    super('The payment session is invalid.');
  }
}
