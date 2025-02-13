import { CustomError } from './CustomError';

export class EmailSendFailedException extends CustomError {
  constructor(email: string, reason: string) {
    super(`Failed to send email to "${email}". Reason: ${reason}`);
  }
}
