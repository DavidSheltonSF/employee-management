import { Either, left, right } from "../../shared/either";
import { InvalidUserRoleError } from "../errors/invalid-userRole";

enum UserRoleEnum{
  ADMIN = 'admin',
  EDITOR = 'editor',
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

    switch(userRole.toLocaleLowerCase()){
      case UserRoleEnum.ADMIN:
        return true;

      case UserRoleEnum.EDITOR:
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