import { DomainError } from "./domain-error";

export class InvalidRoleError extends Error implements DomainError{
  constructor (role: string){
    super(`"${role}" is invalid. Role should contain only letters and numbers.`);
    this.name = 'InvalidRoleError';
  }
}