import { UseCaseError } from "./usecase-error";

export class UserExistsError extends Error implements UseCaseError {
  constructor(email: string){
    super(`The email "${email}" is already registered.`)
    this.name = 'UserExistsError'
  }
}