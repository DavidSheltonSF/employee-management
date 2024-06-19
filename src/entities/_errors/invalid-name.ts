import { DomainError } from "./domain-error";

export class InvalidNameError extends Error implements DomainError {
  constructor (name: string){
    super(`"${name}" is invalid. Name should contain only letters and numbers.`);
    this.name = 'InvalidNameError';
  }
}