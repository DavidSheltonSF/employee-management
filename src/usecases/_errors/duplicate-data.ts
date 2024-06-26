import { UseCaseError } from "./interface/usecase-error";

export class DuplicateDataError extends Error implements UseCaseError {
  constructor(email: string){
    super(`The email "${email}" is already registered.`)
    this.name = 'DuplicateDataError'
  }
}