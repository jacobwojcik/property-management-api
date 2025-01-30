import { ApplicationError, ErrorCode } from './base.error';

export class PropertyNotFoundError extends ApplicationError {
  constructor(id: string) {
    super(ErrorCode.NOT_FOUND, `Property with id ${id} not found`, 404);
  }
}
