import { UseCaseError } from "./interface/usecase-error";

export class UserNotFoundError extends Error implements UseCaseError {
  constructor(email: string){
    super(`User with email "${email}" was not found`);
    this.name = 'UserNotFoundError';
  }
}