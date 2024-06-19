import { DomainError } from "./domain-error";

export class InvalidDepartmentError extends Error implements DomainError {
  constructor(department: string){
    super(`"${department}" is invalid. Department should contain only letters and numbers.`);
    this.name = 'InvalidDepartment';
  }
}