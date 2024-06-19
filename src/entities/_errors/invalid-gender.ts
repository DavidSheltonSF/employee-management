import { DomainError } from "./domain-error";

export class InvalidGenderError extends Error implements DomainError{
  constructor (gender: string){
    super(`"${gender}" is invalid. Gender should be 'male' or 'female'`);
    this.name = 'InvalidGenderError';
  }
}