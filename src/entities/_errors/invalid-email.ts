import { DomainError } from "./domain-error";

export class InvalidEmailError extends Error implements DomainError{
  constructor (email: string){
    super(`"${email}" is invalid. Please enter an email following the correct format.`);
    this.name = 'InvalidEmailError';
  }
}