import { Either, left, right } from "../../shared/either";
import { InvalidDepartmentError } from "../errors/invalid-department";

enum DepartmentEnum {
  CUSTOMER_SERVICE = 'customer_service',
  ADMINISTRATIVE = 'administrative',
  CLEANING = 'cleaning'
}

export class Department {
  private readonly department: string

  private constructor(department: string){
    this.department = department;
  }

  get value (): string{
    return this.department;
  }

  static validate(department: string): boolean{
    const departmentList = Object.values(DepartmentEnum)
      .map((elem) => {
        return String(elem);
      });

    if(!(departmentList.includes(department.toLowerCase()))){
      return false;
    }

    return true;
  }

  static create(department: string): Either<InvalidDepartmentError, Department>{
    
    if (!Department.validate(department)){
      return left(new InvalidDepartmentError(department));
    }

    return right(new Department(department))
  }
}