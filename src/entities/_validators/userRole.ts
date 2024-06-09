import { Either, left, right } from "../../shared/either";
import { InvalidUserRoleError } from "../_errors/invalid-userRole";

enum UserRoleEnum{
  ADMIN = 'admin',
  MANAGER = 'manager',
  EMPLOYEE = 'employee',
  VIEWER = 'viewer'
}

export class UserRole {
  private readonly userRole: string;

  private constructor(userRole: string){
    this.userRole = userRole;
    Object.freeze(this);
  }

  get value (): string{
    return this.userRole;
  }

  static validate(userRole: string): boolean{

    switch(userRole){
      case UserRoleEnum.ADMIN:
        return true;

      case UserRoleEnum.MANAGER:
        return true;

      case UserRoleEnum.EMPLOYEE:
        return true;

      case UserRoleEnum.VIEWER:
        return true;

      default:
        return false;

    }
  }

  static create(userRole:string): Either<InvalidUserRoleError, UserRole>{

    if (!UserRole.validate(userRole)){
      return left(new InvalidUserRoleError(userRole));
    }

    return right(new UserRole(userRole));
  }
}