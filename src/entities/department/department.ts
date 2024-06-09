import { DepartmentData } from "./department-data";
import { 
  InvalidEmailError,
  InvalidNameError, 
} from "../_errors";
import { 
  Email,
  Name, } from "../_validators";
import { Either, left, right } from "../../shared/either";

export class Department {
  name: Name;
  managerEmail: Email;

  private constructor(
    name: Name, managerEmail: Email){
    this.name = name;
    this.managerEmail = managerEmail;

  }

  static create(departmentData: DepartmentData):  Either<InvalidNameError, Department>{
    const nameOrError: Either<InvalidNameError, Name> = Name.
    create(departmentData.name);
  
    if(nameOrError.isLeft()){
      return left(nameOrError.value);
    }

    const emailOrError: Either<InvalidEmailError, Email> = Email.
    create(departmentData.managerEmail);
  
    if(emailOrError.isLeft()){
      return left(emailOrError.value);
    }

    const name = nameOrError.value;
    const managerEmail = emailOrError.value;
    return right(new Department(
      name,
      managerEmail,
    ));
  }
}