import { Either, left, right } from "../../shared/either";
import { InvalidPasswordError } from "../errors/invalid-password";

export class Password{
  private readonly password: string;

  private constructor(password: string){
    this.password = password;
    Object.freeze(this);
  }

  get value (): string{
    return this.password;
  }

  static valitate(password: string): boolean{

    if(password.length < 6 || password.length > 255){
      return false
    }

    return true;
  }

  static create(password: string): Either<InvalidPasswordError, Password>{
    
    if (!Password.valitate(password)){
      return left(new InvalidPasswordError(password));
    }

    return right(new Password(password));
  }
}