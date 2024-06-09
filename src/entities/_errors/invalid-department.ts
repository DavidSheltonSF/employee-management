import { DomainError } from "./domain-error";

export class InvalidDepartmentError extends Error implements DomainError {
  constructor(department: string){
    super(`The department "${department}" is invalid.`);
    this.name = 'InvalidDepartment';
  }
}