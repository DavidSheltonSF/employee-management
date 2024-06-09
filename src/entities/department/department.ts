import { DepartmentData } from "./department-data";
import { 
  InvalidNameError, 
} from "../_errors";
import { 
  Name, } from "../_validators";
import { Either, left, right } from "../../shared/either";

export class Department {
  name: Name;
  managerId: string;

  private constructor(
    name: Name, managerId: string){
    this.name = name;
    this.managerId = managerId;

  }

  static create(departmentData: DepartmentData):  Either<InvalidNameError, Department>{
    const nameOrError: Either<InvalidNameError, Name> = Name.
    create(departmentData.name);
  
    if(nameOrError.isLeft()){
      return left(nameOrError.value);
    }

    const name = nameOrError.value
    const managerId = departmentData.managerId

    return right(new Department(
      name,
      managerId,
    ));
  }
}