import { CustomError } from './CustomError';

export class SlotsNotAvailableException extends CustomError {
  constructor() {
    super('The requested slots are not available.');
  }
}
