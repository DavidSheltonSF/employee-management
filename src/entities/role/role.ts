import { RoleData } from "./role-data";
import { 
  InvalidNameError, InvalidDepartmentError } from "../_errors";
import { 
  Name, Department} from "../_validators";
import { Either, left, right } from "../../shared/either";

export class Role {
  name: Name;
  department: Department;

  private constructor(
    name: Name, department: Department){
    this.name = name;
    this.department = department;
  }

  static create(roleData: RoleData):  Either<InvalidNameError | 
  InvalidDepartmentError, Role>{
    const nameOrError: Either<InvalidNameError, Name> = Name.
      create(roleData.name);
    const departmentOrError: Either<InvalidDepartmentError, Department> = Department.
      create(roleData.department);

    if(nameOrError.isLeft()){
      return left(nameOrError.value);
    }

    if(departmentOrError.isLeft()){
      return left(departmentOrError.value);
    }

    const name = nameOrError.value;
    const department = departmentOrError.value

    return right(new Role(
      name,
      department
    ));
  }
}