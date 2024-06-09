import { Either, left, right } from "../../shared/either";
import { InvalidRoleError } from "../_errors/invalid-role";


export class Role{
  private readonly role: string;

  private constructor(role: string){
    this.role = role;
  }

  get value (): string{
    return this.role;
  }

  static validate(role: string): boolean{


    // Accepts just lowercase words and "_",
    // with no special characters or numbers
    const tester = /^[a-z_]+$/
    if(!tester.test(role)){
      return false;
    }
    
    return true;
  }

  static create(role: string): Either<InvalidRoleError, Role>{

    if (!Role.validate(role)){
      return left(new InvalidRoleError(role));
    }

    return right(new Role(role));
  }

}