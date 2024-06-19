import { DomainError } from "./domain-error";

export class InvalidBirthdayError extends Error implements DomainError {
  constructor (birthday: string){
    super(`"${birthday}" is invalid. Please enter a date following the format: YYYY-MM-DD`);
    this.name = 'InvalidBirthdayError'
  }
}