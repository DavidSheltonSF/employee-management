import { UserData } from "./user-data";
import { 
  InvalidNameError, 
  InvalidEmailError, 
  InvalidPasswordError, 
  InvalidUserRoleError } from "../errors";
import { 
  Name, Email, Password, UserRole } from "../validators";
import { Either, left, right } from "../../shared/either";

export class User {
  private readonly name: Name;
  private readonly lastName: Name;
  private readonly email: Email;
  private readonly userRole: UserRole
  private readonly password: Password

  private constructor(
    name: Name, lastName: Name, email: Email, 
    userRole: UserRole, password: Password){
    this.name = name;
    this.lastName = lastName
    this.email = email;
    this.userRole = userRole;
    this.password = password;
  }

  static create(userData: UserData){
    const nameOrError: Either<InvalidNameError, Name> = Name.
    create(userData.name);
    const lastNameOrError: Either<InvalidNameError, Name> = Name.
    create(userData.lastName);
    const emailOrError: Either<InvalidEmailError, Email> = Email.
    create(userData.email);
    const userRoleOrError: Either<InvalidUserRoleError, UserRole> = UserRole.
    create(userData.userRole);
    const passwordOrError: Either<InvalidPasswordError, Password> = Password.
    create(userData.password);

    if(nameOrError.isLeft()){
      return left(nameOrError.value);
    }

    if(lastNameOrError.isLeft()){
      return left(lastNameOrError.value);
    }

    if(emailOrError.isLeft()){
      return left(emailOrError.value);
    }

    if(userRoleOrError.isLeft()){
      return left(userRoleOrError.value);
    }

    if (passwordOrError.isLeft()){
      return left(passwordOrError.value);
    }

    const name = nameOrError.value;
    const lastName = lastNameOrError.value
    const email = emailOrError.value;
    const userRole = userRoleOrError.value;
    const password = passwordOrError.value;

    return right(new User(
      name,
      lastName,
      email,
      userRole,
      password
    ))
  }
}