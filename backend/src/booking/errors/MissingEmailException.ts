import { CustomError } from './CustomError';

export class MissingEmailException extends CustomError {
  constructor() {
    super('The customer email is missing in the Stripe session.');
  }
}
