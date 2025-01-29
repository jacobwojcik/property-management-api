import { ApplicationError } from './base.error';

export class PropertyNotFoundError extends ApplicationError {
  constructor(id: string) {
    super('PROPERTY_NOT_FOUND', `Property with id ${id} not found`, 404);
  }
}
