import { Either, left, right } from "../../shared/either";
import { InvalidEmailError } from "../errors/invalid-email";

export class Email {
  private readonly email: string

  constructor(email: string){
    this.email = email;
    //Object.freeze(this);
  }

  static create(email: string): Either<InvalidEmailError, Email> {
    
    if (!Email.validate(email)){
      return left(new InvalidEmailError(email));
    }

    return right(new Email(email));
  }

  get value (): string{
    return this.email;
  }

  static validate(email: string): boolean {
    if (!email || email.trim().length > 255){
      return false;
    }

    const tester = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z\d\-]+)\.[a-zA-Z]{2,}$/

    if (!tester.test(email)){
      return false;
    }

    return true;
  }
}