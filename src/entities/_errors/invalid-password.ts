import { DomainError } from "./domain-error";

export class InvalidPasswordError extends Error implements DomainError {
  constructor (password: string){
    super(`"${password}" is a invalid password. Password should contain 6 or more characters`);
    this.name = 'InvalidPasswordError';
  }
}