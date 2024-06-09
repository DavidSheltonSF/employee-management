import { DomainError } from "./domain-error";

export class InvalidPasswordError extends Error implements DomainError {
  constructor (password: string){
    super(`The password "${password}" is invalid. Password`);
    this.name = 'InvalidPasswordError';
  }
}