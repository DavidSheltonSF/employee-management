import { DepartmentData } from "./department-data";
import { InvalidEmailError, InvalidNameError } from "../_errors";
import { Email, Name } from "../_validators";
import { Either, left, right } from "../../shared/either";

export class Department {
  name: Name;
  managerEmail: Email | null = null;

  private constructor(name: Name, managerEmail: Email | null){
    this.name = name;
    this.managerEmail = managerEmail;
  }

  static create(departmentData: DepartmentData):  Either<InvalidNameError, Department>{

    let managerEmail = null;

    const nameOrError: Either<InvalidNameError, Name> = Name.
      create(departmentData.name);
  
    if(nameOrError.isLeft()){
      return left(nameOrError.value);
    }

    if(departmentData.managerEmail){

      const managerEmailOrError: Either<InvalidEmailError, Email> = Email.
        create(departmentData.managerEmail);

      if(managerEmailOrError.isLeft()){
        return left(managerEmailOrError.value);
      }

      managerEmail = managerEmailOrError.value;
    }
    
    const name = nameOrError.value;
    
    return right(new Department(
      name,
      managerEmail,
    ));
  }
}