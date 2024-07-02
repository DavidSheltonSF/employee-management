import { UseCaseError } from "./interface/usecase-error";

export class UnknownDepartmentError extends Error implements UseCaseError {
  constructor(departmentName: string){
    super(`"${departmentName}" department is unknown.`);
    this.name = 'UnknownDepartmentError';
  }
}