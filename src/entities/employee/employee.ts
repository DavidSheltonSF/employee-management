import { EmployeeData } from "./employee-data";
import { Email, Birthday, Department, Gender, Name, Role } from "../validators";
import { Either, left, right } from "../../shared/either";
import { 
  InvalidNameError, 
  InvalidBirthdayError, 
  InvalidEmailError, 
  InvalidDepartmentError, 
  InvalidGenderError, InvalidRoleError } from "../errors";


export class Employee {
  private readonly name: Name;
  private readonly lastName: Name;
  private readonly email: Email
  private readonly birthday: Birthday;
  private readonly gender: Gender;
  private readonly department: Department;
  private readonly role: Role;

  private constructor(
    name: Name,
    lastName: Name,
    email: Email,
    birthday: Birthday,
    gender: Gender,
    role: Role,
    department: Department
  ){
    this.name = name;
    this.lastName = lastName;
    this.email = email;
    this.birthday = birthday;
    this.gender = gender;
    this.role = role;
    this.department = department;
  }

  static create(employeeData: EmployeeData): Either<
  InvalidNameError | InvalidEmailError | InvalidBirthdayError | 
  InvalidDepartmentError | InvalidGenderError | InvalidRoleError, Employee>{

    const nameOrError: Either<InvalidNameError, Name> = Name.create(employeeData.name);
    const lastNameOrError: Either<InvalidNameError, Name> = Name.create(employeeData.lastName);
    const emailOrError: Either<InvalidEmailError, Email> = Email.create(employeeData.email);
    const birthDayOrError: Either<InvalidBirthdayError, Birthday> = Birthday.create(employeeData.birthday);
    const genderOrError: Either<InvalidGenderError, Gender> = Gender.create(employeeData.gender);
    const departmentOrError: Either<InvalidDepartmentError, Department> = Department.create(employeeData.department);
    const roleOrError: Either<InvalidRoleError, Role> = Role.create(employeeData.role);

    if(nameOrError.isLeft()){
      return left(nameOrError.value);
    }

    if(lastNameOrError.isLeft()){
      return left(lastNameOrError.value);
    }

    if(emailOrError.isLeft()){
      return left(emailOrError.value);
    }

    if(birthDayOrError.isLeft()){
      return left(birthDayOrError.value);
    }

    if(genderOrError.isLeft()){
      return left(genderOrError.value);
    }

    if(departmentOrError.isLeft()){
      return left(departmentOrError.value);
    }

    if(roleOrError.isLeft()){
      return left(roleOrError.value);
    }

    const name = nameOrError.value;
    const lastName = lastNameOrError.value;
    const email = emailOrError.value;
    const birthDay = birthDayOrError.value;
    const gender = genderOrError.value;
    const role = roleOrError.value;
    const department = departmentOrError.value

    return right(new Employee(
      name,
      lastName,
      email,
      birthDay,
      gender,
      role,
      department
    ))
  }
}