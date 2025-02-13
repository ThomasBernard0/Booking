import { CustomError } from './CustomError';

export class CodeGenerationException extends CustomError {
  constructor() {
    super('The environment variable CODE_HASH is missing.');
  }
}
