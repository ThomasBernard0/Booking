import { CustomError } from './CustomError';

export class InvalidDateFormatException extends CustomError {
  constructor(date: string) {
    super(`The date format "${date}" is invalid.`);
  }
}
