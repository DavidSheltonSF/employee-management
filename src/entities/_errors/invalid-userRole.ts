import { DomainError } from "./domain-error";

export class InvalidUserRoleError extends Error implements DomainError {
  constructor (userRole: string){
    super(`"${userRole}" is invalid. Department should contain only letters and numbers.`);
    this.name = 'InvalidUserRoleError'
  }
}
