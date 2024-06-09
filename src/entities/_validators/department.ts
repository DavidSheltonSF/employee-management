import { Either, left, right } from "../../shared/either";
import { InvalidDepartmentError } from "../_errors/invalid-department";

export class Department {
  private readonly department: string

  private constructor(department: string){
    this.department = department;
  }

  get value (): string{
    return this.department;
  }

  static validate(department: string): boolean{

    if(department.length < 2){
      return false;
    }

    // Accepts just lowercase words,
    // with no special characters or numbers
    const tester = /^[a-z_]+$/
    if(!tester.test(department)){
      return false;
    }

    return true;
  }

  static create(department: string): Either<InvalidDepartmentError, Department>{
    
    if (!Department.validate(department)){
      return left(new InvalidDepartmentError(department));
    }
    
    return right(new Department(department));
  }
}