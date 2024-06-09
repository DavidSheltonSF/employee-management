import { DomainError } from "./domain-error";

export class InvalidGenderError extends Error implements DomainError{
  constructor (gender: string){
    super(`The gender "${gender}" is invalid.`);
    this.name = 'InvalidGenderError';
  }
}