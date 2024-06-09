import { DomainError } from "./domain-error";

export class InvalidUserRoleError extends Error implements DomainError {
  constructor (userRole: string){
    super(`The user role "${userRole} is invalid."`);
    this.name = 'InvalidUserRoleError'
  }
}
