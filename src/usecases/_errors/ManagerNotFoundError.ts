import { UseCaseError } from "./interface/usecase-error";

export class ManagerNotFoundError extends Error implements UseCaseError {
  constructor(email: string){
    super(`The email "${email}" was not found.`)
    this.name = 'ManagerNotFoundError'
  }
}